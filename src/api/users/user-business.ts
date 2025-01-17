import { User } from '@prisma/client';
import ApiError from '../../types/api-error';
import hasher from '../../services/hasher';
import UserBusiness from './types/user-business';
import UserDtoProps from './types/user-dto-props';
import userRepository from './user-repository';
import * as uuid from 'uuid';
import fileStorageService from '../../services/file-storage-service';
import jwtService from '../../services/jwt-service';

const parseToDto = (user: User): UserDtoProps => {
  const { hashedPassword, createdAt, updatedAt, deletedAt, ...dto } = user;
  return dto;
};

const userBusiness: UserBusiness = {
  async create({ email, password, role }) {
    const existingUser = await userRepository.findOne({ email });
    if (existingUser) {
      ApiError.throwUnprocessableEntity('e-mail inválido.');
    }

    const hashedPassword = await hasher.hash(password);

    const user: User = {
      id: uuid.v4(),
      email,
      role,
      hashedPassword,
      profilePictureUrl: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };

    await userRepository.create(user);

    return parseToDto(user);
  },

  async updateProfilePicture({ userId, fileStream, contentType }) {
    const user = await userRepository.findById(userId);
    if (!user) {
      ApiError.throwNotFound('Usuário não encontrado.');
    }

    const fileName = `${userId}.${contentType.split('/')[1]}`;
    const url = await fileStorageService.upload({
      fileStream,
      fileName,
      contentType,
    });

    user.profilePictureUrl = url;
    await userRepository.update(user);

    return parseToDto(user);
  },

  async auth({ email, password }) {
    const hashedPassword = await hasher.hash(password);

    const user = await userRepository.findOne({ email, hashedPassword });

    if (!user) {
      ApiError.throwUnauthorized('E-mail ou senha inválidos.');
    }

    const accessToken = jwtService.generateToken(user);
    return accessToken;
  },

  async findById(id) {
    const user = await userRepository.findById(id);
    if (!user) {
      ApiError.throwNotFound('Usuário não encontrado.');
    }

    return parseToDto(user);
  },

  async findAll(props) {
    const pagedListOfUsers = await userRepository.findAll(props);
    return pagedListOfUsers.parse(parseToDto);
  },
};

export default userBusiness;
