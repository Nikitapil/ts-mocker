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
  /**
   * user email
   * @example "test@test.tes"
   */
  email: string;
  /**
   * user password
   * @example "12345678"
   */
  password: string;
  /**
   * username
   * @example "Nick"
   */
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
  /**
   * User Id
   * @example 1
   */
  id: number;
  /**
   * User email
   * @example "test@test.test"
   */
  email: string;
  /**
   * username
   * @example "Test user"
   */
  username: string;
  /**
   * user role
   * @example "User"
   */
  role: UserRolesEnum;
}

export interface AuthResponseDto {
  /**
   * access token for user validation
   * @example "asdsfdsfdf.dsfasdfasdfsadfsadf.sdfsadfsdf"
   */
  accessToken: string;
  /** Object with user data */
  user: UserReturnDto;
}

export interface LoginUserDto {
  /**
   * user email
   * @example "test@test.tes"
   */
  email: string;
  /**
   * user password
   * @example "12345678"
   */
  password: string;
}

export interface SuccessMessageDto {
  /**
   * message about success in some operations
   * @example "success"
   */
  message: string;
}

export interface GetRestoreKeyDto {
  /**
   * user email
   * @example "test@test.test"
   */
  email: string;
}

export interface RestorePasswordDto {
  /**
   * User restore key for validate user
   * @example "1234-5678-90123"
   */
  key: string;
  /**
   * user password
   * @example "12345678"
   */
  password: string;
}
