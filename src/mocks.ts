import { faker } from '@faker-js/faker';

import { 
  UserRolesEnum,
  CreateUserDto,
  UserReturnDto,
  AuthResponseDto,
  LoginUserDto,
  SuccessMessageDto,
  GetRestoreKeyDto,
  RestorePasswordDto,
  UserStatus,
  YesType,
  NoType,
  Bool,
  WordType,
  NumberType,
  NumberUnionType,
  StringLiteral,
  RandomUn,
  ArrType,
  HardUnionType,
  DateType,
  StringType,
  StrOrNum,
  numberTypeNative,
  EnumType,
  AnyType,
  BigIntType,
  ClassType,
  UnknownType,
  RecordType,
  Key,
  NestedKey,
  SuperNestedKey,
  Message 
} from '../data-contracts.ts';

export class CreateUserDtoMock {
  public static create(overrides: Partial<CreateUserDto> = {}): CreateUserDto {
    return {
      email: faker.internet.email(),
      password: faker.lorem.word(),
      username: faker.lorem.word(),
      isAdmin: faker.datatype.boolean(),
      stringOrNum: faker.lorem.word(),
      keyOrNestedKey: KeyMock.create(),
      yes: YesTypeMock.create(),
      no: NoTypeMock.create(),
      bool: BoolMock.create(),
      word: WordTypeMock.create(),
      num: NumberTypeMock.create(),
      numUnion: NumberUnionTypeMock.create(),
      stringOr: 'hello',
      stringLiteralNested: 'stringLiteral',
      stringTemplateliteralNested: `${faker.lorem.word()}nested${faker.number.int()}`,
      stringLiteral: `${faker.lorem.word()}Qwe${faker.number.int()}`,
      randomUnion: RandomUnMock.create(),
      arrType: ArrTypeMock.create(),
      dateTyped: DateTypeMock.create(),
      hardUnion: HardUnionTypeMock.create(),
      status: UserStatusMock.create(),
      statuses: [UserStatusMock.create(), UserStatusMock.create()],
      nullable: null,
      nullableOrUndefined: undefined,
      welcome: {
        welcome: faker.lorem.word(),
       },
      classType: ClassTypeMock.create(),
      unknownField: undefined,
      nestedStatus: {
        status: UserStatusMock.create(),
       },
      dates: [faker.date.recent(), faker.date.recent()],
      texts: [faker.lorem.word(), faker.lorem.word()],
      keys: [KeyMock.create(), KeyMock.create()],
      messages: [MessageMock.create(), MessageMock.create()],
      userDto: CreateUserDtoMock.create(),
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

export class UserStatusMock {
  public static create(override: UserStatus = "active"): UserStatus {
    return override
   }
}

export class YesTypeMock {
  public static create(override: YesType = true): YesType {
    return override
   }
}

export class NoTypeMock {
  public static create(override: NoType = false): NoType {
    return override
   }
}

export class BoolMock {
  public static create(override: Bool = faker.datatype.boolean()): Bool {
    return override
   }
}

export class WordTypeMock {
  public static create(override: WordType = "word"): WordType {
    return override
   }
}

export class NumberTypeMock {
  public static create(override: NumberType = 1): NumberType {
    return override
   }
}

export class NumberUnionTypeMock {
  public static create(override: NumberUnionType = 2): NumberUnionType {
    return override
   }
}

export class StringLiteralMock {
  public static create(override: StringLiteral = `${faker.lorem.word()}Qwe${faker.number.int()}`): StringLiteral {
    return override
   }
}

export class RandomUnMock {
  public static create(override: RandomUn = RandomUnMock.create()): RandomUn {
    return override
   }
}

export class ArrTypeMock {
  public static create(override: ArrType = []): ArrType {
    return override
   }
}

export class HardUnionTypeMock {
  public static create(override: HardUnionType = MessageMock.create()): HardUnionType {
    return override
   }
}

export class DateTypeMock {
  public static create(override: DateType = faker.date.recent()): DateType {
    return override
   }
}

export class StringTypeMock {
  public static create(override: StringType = faker.lorem.word()): StringType {
    return override
   }
}

export class StrOrNumMock {
  public static create(override: StrOrNum = faker.lorem.word()): StrOrNum {
    return override
   }
}

export class numberTypeNativeMock {
  public static create(override: numberTypeNative = faker.number.int()): numberTypeNative {
    return override
   }
}

export class EnumTypeMock {
  public static create(override: EnumType = UserRolesEnum.User): EnumType {
    return override
   }
}

export class AnyTypeMock {
  public static create(override: AnyType = undefined): AnyType {
    return override
   }
}

export class BigIntTypeMock {
  public static create(override: BigIntType = faker.number.bigInt()): BigIntType {
    return override
   }
}

export class ClassTypeMock {
  public static create(overrides: Partial<ClassType> = {}): ClassType {
    return {
      welcome: faker.lorem.word(),
      ...overrides
    };
  }
}

export class UnknownTypeMock {
  public static create(override: UnknownType = undefined): UnknownType {
    return override
   }
}

export class RecordTypeMock {
  public static create(overrides: RecordType = {}): RecordType {
    return {

      ...overrides
    };
  }
}

export class KeyMock {
  public static create(overrides: Partial<Key> = {}): Key {
    return {
      id: faker.number.int(),
      value: faker.lorem.word(),
      ...overrides
    };
  }
}

export class NestedKeyMock {
  public static create(overrides: Partial<NestedKey> = {}): NestedKey {
    return {
      key: KeyMock.create(),
      nestedKey: NestedKeyMock.create(),
      ...overrides
    };
  }
}

export class SuperNestedKeyMock {
  public static create(overrides: Partial<SuperNestedKey> = {}): SuperNestedKey {
    return {
      id: faker.number.int(),
      key: NestedKeyMock.create(),
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
        ket: NestedKeyMock.create(),
       },
      ...overrides
    };
  }
}
