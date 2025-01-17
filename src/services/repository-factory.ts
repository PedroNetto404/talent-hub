import prisma from '../config/database';
import PagedList from '../types/paged-list';
import Repository from '../types/repository';
import { Prisma } from '@prisma/client';
import _ from 'lodash';
import prismaUtils from '../utils/prisma-utils';
import FilterOperator from '../api/users/types/filter-operator';

const buildFor = <T extends { id: string }>(
  modelName: Prisma.ModelName,
  inclusions: Record<string, boolean | any> = {},
) => {
  const model: any = prisma[modelName.toLowerCase() as keyof typeof prisma];
  const repository: Repository<T> = {
    async findAll({
      limit = 9999999,
      offset = 0,
      sorting: { field: sortingField, order: sortingOrder } = {
        field: 'id',
        order: 'asc',
      },
      filter: {
        field: filterField,
        operator: filterOperator,
        value: filterValue,
      } = {},
      where = {},
    }) {
      if (filterField && filterOperator && filterValue) {
        let op: any = filterOperator;

        (where as any)[filterField] = {
          [op]: filterValue,
        };
      }

      const options = {
        take: limit,
        skip: offset,
        orderBy: {
          [sortingField]: sortingOrder,
        },
        where,
        include: inclusions,
      };

      const [records, total] = await Promise.all([
        model.findMany(options),
        model.count({ where }),
      ]);

      return PagedList.create(offset, limit, total ?? 0, records ?? []);
    },

    async findById(id: string) {
      return (await model.findUnique({
        where: { id },
        include: inclusions,
      })) as T;
    },

    async findOne(where) {
      return (await model.findFirst({
        where,
        include: inclusions,
      })) as T;
    },

    async create(data) {
      const transformedData = prismaUtils.transformNestedFields(
        _.cloneDeep(data),
        inclusions,
      );

      return await model.create({
        data: transformedData,
        include: inclusions,
      });
    },

    async update(data) {
      const { id, ...rest } = data;
      const transformedData = prismaUtils.transformNestedFields(
        _.cloneDeep(rest),
        inclusions,
      );

      return await model.update({
        where: { id },
        data: transformedData,
        include: inclusions,
      });
    },

    async remove(id) {
      return await model.delete({
        where: { id },
      });
    },

    async count(where = {}) {
      return await model.count({ where });
    },

    async exists(where = {}) {
      return (await repository.count(where)) > 0;
    },
  };

  return repository;
};

const repositoryFactory = {
  buildFor,
};

export default repositoryFactory;
