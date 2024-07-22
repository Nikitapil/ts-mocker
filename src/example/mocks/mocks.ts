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
} from '../source-types.ts';

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
  
  public static createMany(count = 1, overrides: Partial<CreateUserDto> = {}): CreateUserDto[] {
    return Array.from({ length: count }, () => this.create(overrides))  
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
  
  public static createMany(count = 1, overrides: Partial<UserReturnDto> = {}): UserReturnDto[] {
    return Array.from({ length: count }, () => this.create(overrides))  
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
  
  public static createMany(count = 1, overrides: Partial<AuthResponseDto> = {}): AuthResponseDto[] {
    return Array.from({ length: count }, () => this.create(overrides))  
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
  
  public static createMany(count = 1, overrides: Partial<LoginUserDto> = {}): LoginUserDto[] {
    return Array.from({ length: count }, () => this.create(overrides))  
  } 
}

export class SuccessMessageDtoMock {
  public static create(overrides: Partial<SuccessMessageDto> = {}): SuccessMessageDto {
    return {
      message: faker.lorem.word(),
      ...overrides
    };
  }
  
  public static createMany(count = 1, overrides: Partial<SuccessMessageDto> = {}): SuccessMessageDto[] {
    return Array.from({ length: count }, () => this.create(overrides))  
  } 
}

export class GetRestoreKeyDtoMock {
  public static create(overrides: Partial<GetRestoreKeyDto> = {}): GetRestoreKeyDto {
    return {
      email: faker.internet.email(),
      ...overrides
    };
  }
  
  public static createMany(count = 1, overrides: Partial<GetRestoreKeyDto> = {}): GetRestoreKeyDto[] {
    return Array.from({ length: count }, () => this.create(overrides))  
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
  
  public static createMany(count = 1, overrides: Partial<RestorePasswordDto> = {}): RestorePasswordDto[] {
    return Array.from({ length: count }, () => this.create(overrides))  
  } 
}

export class UserStatusMock {
  public static create(override: UserStatus = "active"): UserStatus {
    return override
  }
  
  public static createMany(count = 1, override: UserStatus = "active"): UserStatus[] {
    return Array.from({ length: count }, () => this.create(override))  
  } 
}

export class YesTypeMock {
  public static create(override: YesType = true): YesType {
    return override
  }
  
  public static createMany(count = 1, override: YesType = true): YesType[] {
    return Array.from({ length: count }, () => this.create(override))  
  } 
}

export class NoTypeMock {
  public static create(override: NoType = false): NoType {
    return override
  }
  
  public static createMany(count = 1, override: NoType = false): NoType[] {
    return Array.from({ length: count }, () => this.create(override))  
  } 
}

export class BoolMock {
  public static create(override: Bool = faker.datatype.boolean()): Bool {
    return override
  }
  
  public static createMany(count = 1, override: Bool = faker.datatype.boolean()): Bool[] {
    return Array.from({ length: count }, () => this.create(override))  
  } 
}

export class WordTypeMock {
  public static create(override: WordType = "word"): WordType {
    return override
  }
  
  public static createMany(count = 1, override: WordType = "word"): WordType[] {
    return Array.from({ length: count }, () => this.create(override))  
  } 
}

export class NumberTypeMock {
  public static create(override: NumberType = 1): NumberType {
    return override
  }
  
  public static createMany(count = 1, override: NumberType = 1): NumberType[] {
    return Array.from({ length: count }, () => this.create(override))  
  } 
}

export class NumberUnionTypeMock {
  public static create(override: NumberUnionType = 2): NumberUnionType {
    return override
  }
  
  public static createMany(count = 1, override: NumberUnionType = 2): NumberUnionType[] {
    return Array.from({ length: count }, () => this.create(override))  
  } 
}

export class StringLiteralMock {
  public static create(override: StringLiteral = `${faker.lorem.word()}Qwe${faker.number.int()}`): StringLiteral {
    return override
  }
  
  public static createMany(count = 1, override: StringLiteral = `${faker.lorem.word()}Qwe${faker.number.int()}`): StringLiteral[] {
    return Array.from({ length: count }, () => this.create(override))  
  } 
}

export class RandomUnMock {
  public static create(override: RandomUn = RandomUnMock.create()): RandomUn {
    return override
  }
  
  public static createMany(count = 1, override: RandomUn = RandomUnMock.create()): RandomUn[] {
    return Array.from({ length: count }, () => this.create(override))  
  } 
}

export class ArrTypeMock {
  public static create(override: ArrType = []): ArrType {
    return override
  }
  
  public static createMany(count = 1, override: ArrType = []): ArrType[] {
    return Array.from({ length: count }, () => this.create(override))  
  } 
}

export class HardUnionTypeMock {
  public static create(override: HardUnionType = MessageMock.create()): HardUnionType {
    return override
  }
  
  public static createMany(count = 1, override: HardUnionType = MessageMock.create()): HardUnionType[] {
    return Array.from({ length: count }, () => this.create(override))  
  } 
}

export class DateTypeMock {
  public static create(override: DateType = faker.date.recent()): DateType {
    return override
  }
  
  public static createMany(count = 1, override: DateType = faker.date.recent()): DateType[] {
    return Array.from({ length: count }, () => this.create(override))  
  } 
}

export class StringTypeMock {
  public static create(override: StringType = faker.lorem.word()): StringType {
    return override
  }
  
  public static createMany(count = 1, override: StringType = faker.lorem.word()): StringType[] {
    return Array.from({ length: count }, () => this.create(override))  
  } 
}

export class StrOrNumMock {
  public static create(override: StrOrNum = faker.lorem.word()): StrOrNum {
    return override
  }
  
  public static createMany(count = 1, override: StrOrNum = faker.lorem.word()): StrOrNum[] {
    return Array.from({ length: count }, () => this.create(override))  
  } 
}

export class numberTypeNativeMock {
  public static create(override: numberTypeNative = faker.number.int()): numberTypeNative {
    return override
  }
  
  public static createMany(count = 1, override: numberTypeNative = faker.number.int()): numberTypeNative[] {
    return Array.from({ length: count }, () => this.create(override))  
  } 
}

export class EnumTypeMock {
  public static create(override: EnumType = UserRolesEnum.User): EnumType {
    return override
  }
  
  public static createMany(count = 1, override: EnumType = UserRolesEnum.User): EnumType[] {
    return Array.from({ length: count }, () => this.create(override))  
  } 
}

export class AnyTypeMock {
  public static create(override: AnyType = undefined): AnyType {
    return override
  }
  
  public static createMany(count = 1, override: AnyType = undefined): AnyType[] {
    return Array.from({ length: count }, () => this.create(override))  
  } 
}

export class BigIntTypeMock {
  public static create(override: BigIntType = faker.number.bigInt()): BigIntType {
    return override
  }
  
  public static createMany(count = 1, override: BigIntType = faker.number.bigInt()): BigIntType[] {
    return Array.from({ length: count }, () => this.create(override))  
  } 
}

export class ClassTypeMock {
  public static create(overrides: Partial<ClassType> = {}): ClassType {
    return {
      welcome: faker.lorem.word(),
      ...overrides
    };
  }
  
  public static createMany(count = 1, overrides: Partial<ClassType> = {}): ClassType[] {
    return Array.from({ length: count }, () => this.create(overrides))  
  } 
}

export class UnknownTypeMock {
  public static create(override: UnknownType = undefined): UnknownType {
    return override
  }
  
  public static createMany(count = 1, override: UnknownType = undefined): UnknownType[] {
    return Array.from({ length: count }, () => this.create(override))  
  } 
}

export class RecordTypeMock {
  public static create(overrides: RecordType = {}): RecordType {
    return {

      ...overrides
    };
  }
  
  public static createMany(count = 1, overrides: RecordType = {}): RecordType[] {
    return Array.from({ length: count }, () => this.create(overrides))  
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
  
  public static createMany(count = 1, overrides: Partial<Key> = {}): Key[] {
    return Array.from({ length: count }, () => this.create(overrides))  
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
  
  public static createMany(count = 1, overrides: Partial<NestedKey> = {}): NestedKey[] {
    return Array.from({ length: count }, () => this.create(overrides))  
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
  
  public static createMany(count = 1, overrides: Partial<SuperNestedKey> = {}): SuperNestedKey[] {
    return Array.from({ length: count }, () => this.create(overrides))  
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
  
  public static createMany(count = 1, overrides: Partial<Message> = {}): Message[] {
    return Array.from({ length: count }, () => this.create(overrides))  
  } 
}
