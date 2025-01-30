import _ from 'lodash';
import { z } from 'zod';
import { Id } from '../types/id';
import { FilterOperator, FilterOperatorValues } from '../enums/filter-operator';
import { ApiError } from '../types/api-error';

export type BuildQuerySchemaArgs<T extends Id> = {
    sorts: (keyof T)[];
    searchs: {
        field: keyof T;
        operators: FilterOperator[];
        transform?: (value: string) => T[keyof T];
        validation?: (value: string) => string | null;
    }[];
};

const LimitSchema = z
    .string()
    .transform((value) => parseInt(value))
    .refine((value) => value > 0, 'limit must be greater than 0')
    .default('10')
    .optional();

const SortSchema = <T extends Id>(sorts: BuildQuerySchemaArgs<T>['sorts']) =>
    z
        .string()
        .transform((value) =>
            value.split(';').map((sort) => {
                const [field, order] = sort.split(':');
                return {
                    field,
                    order,
                };
            }),
        )
        .refine(
            (value) =>
                value.every(
                    ({ field, order }) =>
                        sorts.includes(field as keyof T) && (order === 'asc' || order === 'desc'),
                ),
            `sort must be in the format 'field:order'. Allowed: ${sorts.join(', ')}`,
        )
        .optional()
        .default('id:asc');

const FilterSchema = <T extends Id>(searchs: BuildQuerySchemaArgs<T>['searchs']) =>
    z
        .string()
        .transform((value) => {
            const filters = value.split(';').map((f) => f.trim());

            if (filters.length === 1 && filters[0] === '') {
                return [];
            }

            return filters.map((f) => {
                const match = f.match(/(.+)\[(.+)\]:(.+)/);

                if (!match) {
                    ApiError.throwBadRequest(
                        'filter must be in the format "field[operator]:value"',
                    );
                }

                const [, field, operator, value] = match!;

                const { transform, validation } =
                    searchs.find((sf) => sf.field === (field as keyof T)) ?? {};

                if (validation) {
                    const errorMessage = validation(value);
                    if (errorMessage) {
                        ApiError.throwBadRequest(errorMessage);
                    }
                }

                const filter = {
                    field: field as string,
                    operator: operator as FilterOperator,
                    value,
                };

                if (
                    filter.operator === FilterOperator.in ||
                    filter.operator === FilterOperator.notIn
                ) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (filter as any).value = _.uniq(value.split(',')).map((v) =>
                        transform ? transform(v) : v,
                    );
                } else {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (filter as any).value = transform ? transform(value) : value;
                }

                return filter;
            });
        })
        .refine(
            (filters) =>
                _.isArray(filters) &&
                filters.every(
                    ({ field, operator }) =>
                        FilterOperatorValues.includes(operator) &&
                        searchs.some((sf) => sf.field === field && sf.operators.includes(operator)),
                ),
            `filter must be in the format 'field[operator]:value'. Allowed: ${searchs.map(({ field, operators }) => `${field as string}[${operators.join(', ')}]`).join(', ')}`,
        )
        .optional()
        .default('');

const OffsetSchema = z
    .string()
    .transform((value) => parseInt(value))
    .refine((value) => value >= 0, 'offset must be greater than or equal to 0')
    .default('0')
    .optional();

export const buildQuerySchema = <T extends Id>({
    sorts = ['id'],
    searchs = [
        {
            field: 'id',
            operators: [FilterOperator.eq],
        },
    ],
}: BuildQuerySchemaArgs<T>) => {
    if (!sorts.includes('id')) {
        sorts.push('id');
    }

    if (!searchs.some(({ field }) => field === 'id')) {
        searchs.push({
            field: 'id',
            operators: [FilterOperator.eq],
        });
    }

    return z.object({
        limit: LimitSchema,
        offset: OffsetSchema,
        sort: SortSchema(sorts),
        filter: FilterSchema(searchs),
    });
};

type BuildFileSchemaArgs = {
    allowedMimeTypes: string[];
    maxSize: number;
};
export const buildFileSchema = ({ allowedMimeTypes, maxSize }: BuildFileSchemaArgs) =>
    z.object({
        mimetype: z.string().refine((value) => allowedMimeTypes.includes(value), {
            message: `Invalid file type. Allowed types: ${allowedMimeTypes.join(', ')}`,
        }),
        buffer: z.any().refine(
            (value) => {
                const buffer: Buffer = value;
                return buffer.length > 0 && buffer.length <= maxSize;
            },
            {
                message: `File size must be less than ${maxSize}MB`,
            },
        ),
    });
