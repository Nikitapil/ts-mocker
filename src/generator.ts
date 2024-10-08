import * as fs from 'fs';
import {
  Project,
  SourceFile,
  InterfaceDeclaration,
  TypeAliasDeclaration,
  TypeNode,
  Type, PropertySignature
} from 'ts-morph';
import * as path from "node:path";
import { replaceBracketValues } from "./utils.ts";
import { getObjectTypeClassTemplate, getObjectValuesTemplate, getTypeClassTemplate } from "./classes-templates.ts";

type MockGeneratorOptions = {
  filePath: string,
  outputPath?: string,
  propertiesRules?: Record<string, string>
  typeRules?: Record<string, string>
  needImportsTypePrefix?: boolean,
  allowImportingTsExtensions: boolean
}

export class MockGenerator {
  private project: Project;
  private sourceFile: SourceFile;
  private readonly sourcePath: string;
  private readonly enums: Record<string, string[]>;
  private readonly outputPath: string;
  private readonly propertiesRules: Record<string, string> = {
    email: 'faker.internet.email()'
  };
  private readonly needImportsTypePrefix: boolean = false;
  private readonly allowImportingTsExtensions: boolean = false;
  private readonly typeRules: Record<string, string> = {
    string: 'faker.lorem.word()',
    number: 'faker.number.int()',
    Date: 'faker.date.recent()',
    boolean: 'faker.datatype.boolean()',
    BigInt: 'faker.number.bigInt()',
    null: 'null',
    undefined: 'undefined',
    any: 'undefined',
    unknown: 'undefined',
  }

  constructor({
    filePath,
    outputPath = 'generated_mocks.ts',
    propertiesRules = {},
    typeRules = {},
    needImportsTypePrefix = false ,
    allowImportingTsExtensions = false
  }: MockGeneratorOptions) {
    this.project = new Project();
    this.sourceFile = this.project.addSourceFileAtPath(filePath);
    this.sourcePath = filePath;
    this.outputPath = outputPath;
    this.enums = this.prepareEnums();
    this.needImportsTypePrefix = needImportsTypePrefix
    this.allowImportingTsExtensions = allowImportingTsExtensions
    this.propertiesRules = {
      ...this.propertiesRules,
      ...propertiesRules
    }
    this.typeRules = {
      ...this.typeRules,
      ...typeRules
    }
  }

  private getCleanTypeText(typeText: string): string {
    if (typeText.startsWith('import') && typeText.includes('.')) {
      typeText = typeText.split('.')[1];
    }
    return typeText
  }

  private prepareEnums() {
    return this.sourceFile.getEnums().reduce((acc: Record<string, string[]>, enumDeclaration) => {
      const name = enumDeclaration.getName()
      acc[name] = enumDeclaration.getMembers().map(member => member.getName())
      return acc
    }, {})
  }

  public generate(): string {
    const fakerImport = `import { faker } from '@faker-js/faker';\n\n`
    const sourceDeclarationsNames: string[] = [...Object.keys(this.enums)];
    let output = '';


    [...this.sourceFile.getInterfaces(), ...this.sourceFile.getTypeAliases()].forEach((typeAlias) => {
      sourceDeclarationsNames.push(
        (this.needImportsTypePrefix ? 'type ' : '') + typeAlias.getName()
      );
      output += this.generateMockClass(typeAlias);
    });

    let typeImports = `import { \n  ${ sourceDeclarationsNames.join(',\n  ') } \n} from '${'./' +
      path.relative(path.dirname(this.outputPath), this.sourcePath)
    }';\n`

    if (!this.allowImportingTsExtensions) {
      typeImports = typeImports.replace('.ts', '')
    }

    const imports = [fakerImport, typeImports]
    output = imports.join('') + output;

    fs.writeFileSync(this.outputPath, output);
    console.log('Mock classes generated successfully!');
    return output;
  }

  private generateUnionMockClass(declaration: InterfaceDeclaration | TypeAliasDeclaration) {
    const name = declaration.getName();

    const unions = declaration.getType().getUnionTypes().map(t => {
      const typeText = t.getText()
      return this.handleTypeText(typeText, name)
    })

    return getTypeClassTemplate(name, unions[0])
  }

  private generateTypeClass(declaration: InterfaceDeclaration | TypeAliasDeclaration) {
    const name = declaration.getName();
    const value = this.generateMockValue(declaration.getType(), name)
    return getTypeClassTemplate(name, value)
  }

  private generateArrayTypeMockClass(declaration: InterfaceDeclaration | TypeAliasDeclaration) {
    return getTypeClassTemplate(declaration.getName(), '[]')
  }


  private generateMockClass(
    declaration: InterfaceDeclaration | TypeAliasDeclaration
  ): string {
    const name = declaration.getName();
    const type = declaration.getType();
    const text = type.getText()
    const commonObjTypes = ['Date', 'BigInt']

    if (type.isArray()) {
        return this.generateArrayTypeMockClass(declaration)
    }

    if (type.isLiteral() ||
        type.isString() ||
        type.isNumber() ||
        type.isBoolean() ||
        type.isEnum() ||
        type.isAny() ||
        type.isBigInt() ||
        type.isUnknown() ||
        type.isTemplateLiteral() ||
        commonObjTypes.includes(text)
      ) {
      return this.generateTypeClass(declaration)
    }

    if (type.isUnion()) {
      return this.generateUnionMockClass(declaration);
    }

    const isPartial = !declaration.getType().getText().includes('Record')
    const isInterface = declaration instanceof InterfaceDeclaration
    const properties = isInterface ? declaration.getProperties() : type.getProperties()

    const objValues = properties.reduce((acc: Record<string, string>, prop) => {
      const name = prop.getName();
      const propType = prop instanceof PropertySignature ? prop.getTypeNode() : prop.getValueDeclaration()?.getType()
      acc[name] = this.generateMockValue(propType, name)
      return acc
    }, {})

    return getObjectTypeClassTemplate({ name, values: objValues, isRecordType: isPartial });
  }

  //check if is Common type
  private isGlobalType(typeText: string) {
    const commontypes = ['string', 'number', 'boolean'];
    return global.hasOwnProperty(typeText) || commontypes.includes(typeText)
  }

  private generateMockValue(typeNode: TypeNode | Type | undefined, typeName: string, objectLevel = 2): string {
    if (!typeNode) return 'undefined';

    const typeText = this.getCleanTypeText(typeNode.getText());

    const type = typeNode instanceof TypeNode ? typeNode.getType() : typeNode;

    // check templateLiteralTypes
    if (type.isTemplateLiteral?.()) {
      return replaceBracketValues(type.getText(), (val) => this.handleTypeText(val, typeName))
    }

      // check literal object type
      if (type.isObject?.() && !this.getExistingInterfaceOrType(typeText) && !this.isGlobalType(typeText) && !type.isArray()) {
        let result = '{\n'

        const objValues = type.getProperties().reduce((acc: Record<string, string>, prop) => {
          const name = prop.getName()
          acc[name] = this.generateMockValue(
            prop.getValueDeclaration()?.getType(),
            name,
            objectLevel+2
          )
          return acc
        }, {})

        result += getObjectValuesTemplate(objValues, objectLevel)
        return result + `\n${' '.repeat(objectLevel)}     }`
    }

    return this.handleTypeText(typeText, typeName);
  }

  private getExistingInterfaceOrType(typeText: string) {
    typeText = this.getCleanTypeText(typeText)
    return this.sourceFile.getInterface(typeText) ||
      this.sourceFile.getTypeAlias(typeText)
  }

  private handleTypeText(typeText: string, typeName: string): string {
    if (this.propertiesRules.hasOwnProperty(typeName)) {
      return this.propertiesRules[typeName]
    }

    if (this.typeRules.hasOwnProperty(typeText)) {
      return this.typeRules[typeText];
    }

    if (this.enums[typeText]) {
      return `${typeText}.${this.enums[typeText][0]}`
    }

    if (typeText.includes('|')) {
      const textType = typeText.split('|')[0].trim();
      const result = this.handleTypeText(textType, typeName)
      return result === 'undefined' ? textType : result
    }

    if (typeText.startsWith('Array<') || typeText.endsWith('[]')) {
      const innerType = typeText
        .replace('Array<', '')
        .replace('[]', '')
        .replace('>', '');
      return `[${this.handleTypeText(innerType, innerType)}, ${this.handleTypeText(
        innerType,
        innerType
      )}]`;
    }
    // Check if it's a nested type from the same file
    if (this.getExistingInterfaceOrType(typeText)) {
      return `${this.getCleanTypeText(typeText)}Mock.create()`;
    }
    // For unknown types
    return typeText;
  }
}