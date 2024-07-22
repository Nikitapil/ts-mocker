class WelcomeClass {
  welcome = 'welcome';
}

export type UserStatus = 'active' | 'inactive' | 'archived' | 'blocked';

export type YesType = true
export type NoType = false
export type Bool = boolean
export type WordType = 'word'
export type NumberType = 1
export type NumberUnionType = 2 | 3 | 4
export type StringLiteral = `${string}Qwe${number}`
export type RandomUn = YesType | NoType
export type ArrType = NumberUnionType[]
export type HardUnionType = Message | SuccessMessageDto
export type DateType = Date
export type StringType = string
export type StrOrNum = string | number
export type numberTypeNative = number
export type EnumType = UserRolesEnum
export type AnyType = any
export type BigIntType = BigInt
export type ClassType = WelcomeClass
export type UnknownType = unknown
export type RecordType = Record<string, number>

export type Key = {
  id: number
  value: string
}
export type NestedKey = {
  key: Key
  nestedKey: NestedKey
}

export type SuperNestedKey = {
  id: number,
  key: NestedKey
}

export type Message = {
  name: string;
  title: string;
  paths: string[];
  nestedKey: Key;
  superNestedKey: {
    ket: NestedKey
  }
}

export interface CreateUserDto {
  email: string;
  password: string;
  username: string;

  isAdmin: boolean;

  stringOrNum: string | number

  keyOrNestedKey: Key | NestedKey

  yes: YesType

  no: NoType

  bool: Bool

  word: WordType

  num: NumberType

  numUnion: NumberUnionType

  stringOr: 'hello' | 'world'

  stringLiteralNested: 'stringLiteral'

  stringTemplateliteralNested: `${string}nested${number}`

  stringLiteral: StringLiteral

  randomUnion: RandomUn

  arrType: ArrType

  dateTyped: DateType

  // stringTyped: StringType

  hardUnion: HardUnionType

  status: UserStatus

  statuses: UserStatus[]

  nullable: null

  nullableOrUndefined: undefined | null

  welcome: WelcomeClass

  classType: ClassType

  unknownField: unknown

  nestedStatus: {
    status: UserStatus
  }

  dates: Date[];

  texts: string[];

  keys: Key[];

  messages: Message[];

  userDto: CreateUserDto

  children: {
    males: number,
    girls: number,

    youngest: {
      age: number,
      name: string,
      contacts: {
        email: string,
        username: string,
        birthday: Date,
      }
    }
  }
}

export enum UserRolesEnum {
  User = 'User',
  Admin = 'Admin'
}

export interface UserReturnDto {
  id: number;
  email: string;
  username: string;
  role: UserRolesEnum;
}

export interface AuthResponseDto {
  accessToken: string;
  user: UserReturnDto;
}

export interface LoginUserDto {
  email: string;
  password: string;
}

export interface SuccessMessageDto {
  message: string;
}

export interface GetRestoreKeyDto {
  email: string;
}

export interface RestorePasswordDto {
  key: string;
  password: string;
}
