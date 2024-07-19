import { faker } from '@faker-js/faker';

import { UserRolesEnum, CreateUserDto, UserReturnDto, AuthResponseDto, LoginUserDto, SuccessMessageDto, GetRestoreKeyDto, RestorePasswordDto } from '../data-contracts.ts';

export class CreateUserDtoMock {
  public static create(overrides: Partial<CreateUserDto> = {}): CreateUserDto {
    return {
      email: faker.lorem.word(),
      password: faker.lorem.word(),
      username: faker.lorem.word(),
      isAdmin: faker.datatype.boolean(),
      ...overrides
    };
  }
}

export class UserReturnDtoMock {
  public static create(overrides: Partial<UserReturnDto> = {}): UserReturnDto {
    return {
      id: faker.number.int(),
      email: faker.lorem.word(),
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
      email: faker.lorem.word(),
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
      email: faker.lorem.word(),
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

