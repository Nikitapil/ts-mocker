# TS-Mocker 

---
### Simple mock generator based on [fakerjs](https://fakerjs.dev/)
### This tool generates mock data based on typescript interfaces and types

## Get started
Get generator tool by one of this methods:
* install it from git via npm:
```bash
npm install git+https://github.com/Nikitapil/ts-mocker.git

OR

npm install git+git@github.com:Nikitapil/ts-mocker.git
```
* Or just copy code from this repo

### Usage example

Create file with generator setup, provide options like filePath and outputPath
```typescript
import {MockGenerator} from "../generator.ts";
import * as path from "node:path";

(() => {
  const generator = new MockGenerator({
    filePath: './src/example/source-types.ts',
    outputPath: path.resolve(process.cwd(), 'src/example/mocks', 'mocks.ts')
  })

  generator.generate()
})()
```
run this file with any available ts files runners(I prefer tsx)
```bash
npx tsx path/to/your/generator-setup/file
```
File with mocks will be created by provided outputPath

#### Generated mocks are classes with static methods create and createMany(if need create an array of mocks). You can pass override parameter to override generated mock data. Mock classes look like this:
```typescript
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
```

### Setup options

1. filePath - path to source typescript file with types and interfaces
2. outputPath - path where to generated file with mock classes
3. propertiesRules - object with specific rules of generation for your objects properties
4. typeRules - object with specific rules of generation for your properties types
5. needImportsTypePrefix - is typescript verbatimModuleSyntax is on
6. allowImportingTsExtensions - is .ts extensions are allowed in imports

To set propertiesRules or typeRules you can use [faker js api](https://fakerjs.dev/api/) and provide methods calls as strings or create your own specific rules
