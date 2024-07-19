import { faker } from '@faker-js/faker';

import { UserRolesEnum, CreateUserDto, UserReturnDto, AuthResponseDto, LoginUserDto, SuccessMessageDto, GetRestoreKeyDto, RestorePasswordDto } from './data-contracts';

export class CreateUserDtoMock {
  public static create(): CreateUserDto {
    return {
      email: faker.lorem.word(),
      password: faker.lorem.word(),
      username: faker.lorem.word(),
      isAdmin: faker.datatype.boolean(),
    };
  }
}

export class UserReturnDtoMock {
  public static create(): UserReturnDto {
    return {
      id: faker.number.int(),
      email: faker.lorem.word(),
      username: faker.lorem.word(),
      role: UserRolesEnum.User,
    };
  }
}

export class AuthResponseDtoMock {
  public static create(): AuthResponseDto {
    return {
      accessToken: faker.lorem.word(),
      user: UserReturnDtoMock.create(),
    };
  }
}

export class LoginUserDtoMock {
  public static create(): LoginUserDto {
    return {
      email: faker.lorem.word(),
      password: faker.lorem.word(),
    };
  }
}

export class SuccessMessageDtoMock {
  public static create(): SuccessMessageDto {
    return {
      message: faker.lorem.word(),
    };
  }
}

export class GetRestoreKeyDtoMock {
  public static create(): GetRestoreKeyDto {
    return {
      email: faker.lorem.word(),
    };
  }
}

export class RestorePasswordDtoMock {
  public static create(): RestorePasswordDto {
    return {
      key: faker.lorem.word(),
      password: faker.lorem.word(),
    };
  }
}

