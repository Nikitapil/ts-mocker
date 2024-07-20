import { faker } from '@faker-js/faker';

import { UserRolesEnum, Key, Message, CreateUserDto, UserReturnDto, AuthResponseDto, LoginUserDto, SuccessMessageDto, GetRestoreKeyDto, RestorePasswordDto } from '../data-contracts.ts';

export class KeyMock {
  public static create(overrides: Partial<Key> = {}): Key {
    return {
      id: faker.number.int(),
      value: faker.lorem.word(),
      ...overrides
    };
  }
}

export class MessageMock {
  public static create(overrides: Partial<Message> = {}): Message {
    return {
      name: faker.lorem.word(),
      title: faker.lorem.word(),
      paths: [faker.lorem.word(), faker.lorem.word()],
      nestedKey: KeyMock.create(),
      superNestedKey: {
        id: faker.number.int(),
        key: {
          key: {
            id: faker.number.int(),
            value: faker.lorem.word(),
           },
         },
       },
      ...overrides
    };
  }
}

export class CreateUserDtoMock {
  public static create(overrides: Partial<CreateUserDto> = {}): CreateUserDto {
    return {
      email: faker.internet.email(),
      password: faker.lorem.word(),
      username: faker.lorem.word(),
      isAdmin: faker.datatype.boolean(),
      texts: [faker.lorem.word(), faker.lorem.word()],
      keys: [KeyMock.create(), KeyMock.create()],
      messages: [MessageMock.create(), MessageMock.create()],
      children: {
        males: faker.number.int(),
        girls: faker.number.int(),
        youngest: {
          age: faker.number.int(),
          name: faker.lorem.word(),
          contacts: {
            email: faker.internet.email(),
            username: faker.lorem.word(),
            birthday: faker.date.recent(),
           },
         },
       },
      ...overrides
    };
  }
}

export class UserReturnDtoMock {
  public static create(overrides: Partial<UserReturnDto> = {}): UserReturnDto {
    return {
      id: faker.number.int(),
      email: faker.internet.email(),
      username: faker.lorem.word(),
      role: UserRolesEnum.User,
      ...overrides
    };
  }
}

export class AuthResponseDtoMock {
  public static create(overrides: Partial<AuthResponseDto> = {}): AuthResponseDto {
    return {
      accessToken: faker.lorem.word(),
      user: UserReturnDtoMock.create(),
      ...overrides
    };
  }
}

export class LoginUserDtoMock {
  public static create(overrides: Partial<LoginUserDto> = {}): LoginUserDto {
    return {
      email: faker.internet.email(),
      password: faker.lorem.word(),
      ...overrides
    };
  }
}

export class SuccessMessageDtoMock {
  public static create(overrides: Partial<SuccessMessageDto> = {}): SuccessMessageDto {
    return {
      message: faker.lorem.word(),
      ...overrides
    };
  }
}

export class GetRestoreKeyDtoMock {
  public static create(overrides: Partial<GetRestoreKeyDto> = {}): GetRestoreKeyDto {
    return {
      email: faker.internet.email(),
      ...overrides
    };
  }
}

export class RestorePasswordDtoMock {
  public static create(overrides: Partial<RestorePasswordDto> = {}): RestorePasswordDto {
    return {
      key: faker.lorem.word(),
      password: faker.lorem.word(),
      ...overrides
    };
  }
}

