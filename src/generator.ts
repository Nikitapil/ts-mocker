import * as fs from 'fs';
import {
  Project,
  SourceFile,
  InterfaceDeclaration,
  TypeAliasDeclaration,
  TypeNode,
  Type
} from 'ts-morph';
import * as path from "node:path";

type MockGeneratorOptions = {
  filePath: string,
  outputPath?: string,
  propertiesRules?: Record<string, string>
  typeRules?: Record<string, string>
}

class MockGenerator {
  private project: Project;
  private sourceFile: SourceFile;
  private generatedTypes: Set<string>;
  private sourcePath: string;
  private enums: Record<string, string[]>;
  private outputPath: string;
  private propertiesRules: Record<string, string> = {
    email: 'faker.internet.email()'
  };
  private typeRules: Record<string, string> = {}

  constructor({ filePath, outputPath = 'generated_mocks.ts', propertiesRules = {}, typeRules = {} }: MockGeneratorOptions) {
    this.project = new Project();
    this.sourceFile = this.project.addSourceFileAtPath(filePath);
    this.generatedTypes = new Set();
    this.sourcePath = filePath;
    this.enums = this.prepareEnums()
    this.outputPath = outputPath;
    this.propertiesRules = {
      ...this.propertiesRules,
      ...propertiesRules
    }
    this.typeRules = {
      ...this.typeRules,
      ...typeRules
    }
  }

  private prepareEnums() {
    return this.sourceFile.getEnums().reduce((acc: Record<string, string[]>, enumDeclaration) => {
      const name = enumDeclaration.getName()
      acc[name] = enumDeclaration.getMembers().map(member => member.getName())
      return acc
    }, {})
  }

  private getSourceEnumNames() {
    return Object.keys(this.enums)
  }

  public generate(): string {
    const fakerImport = `import { faker } from '@faker-js/faker';\n\n`
    const sourceDeclarationsNames: string[] = [...this.getSourceEnumNames()];
    let output = '';

    this.sourceFile.getInterfaces().forEach((interfaceDecl) => {
      sourceDeclarationsNames.push(interfaceDecl.getName());
      output += this.generateMockClass(interfaceDecl);
    });

    this.sourceFile.getTypeAliases().forEach((typeAlias) => {
      sourceDeclarationsNames.push(
        typeAlias.getName()
      );
      output += this.generateMockClass(typeAlias);
    });
    const imports = [fakerImport, this.prepareTypesImports(sourceDeclarationsNames)]
    output = imports.join('') + output;

    fs.writeFileSync(this.outputPath, output);
    return output;
  }

  private prepareTypesImports(typesNames: string[]) {
    return `import { ${ typesNames.join(', ') } } from '${
      path.relative(path.dirname(this.outputPath), this.sourcePath)
    }';\n\n`
  }


  private generateMockClass(
    declaration: InterfaceDeclaration | TypeAliasDeclaration
  ): string {
    const name = declaration.getName();
    if (this.generatedTypes.has(name)) {
      return ''; // Skip if already generated
    }
    this.generatedTypes.add(name);

    const overrideType = `Partial<${name}>`;
    let output = `export class ${name}Mock {\n`;
    output += `  public static create(overrides: ${overrideType} = {}): ${name} {\n`;
    output += `    return {\n`;

    if (declaration instanceof InterfaceDeclaration) {
      declaration.getProperties().forEach((prop) => {
        output += `      ${prop.getName()}: ${this.generateMockValue(
          prop.getTypeNode(),
          prop.getName()
        )},\n`;
      });
    } else {
      const type = declaration.getType();
      if (type.isObject()) {
        type.getProperties().forEach((prop) => {
          output += `      ${prop.getName()}: ${this.generateMockValue(
            prop.getValueDeclaration()?.getType(),
            prop.getName()
          )},\n`;
        });
      } else {
        output += `      ${this.generateMockValue(
          declaration.getTypeNode(),
          declaration.getTypeNode()?.getText() || ''
        )}\n`;
      }
    }

    output += `      ...overrides\n`;
    output += `    };\n`;
    output += `  }\n`;
    output += `}\n\n`;

    return output;
  }

  //check if is Common type
  private isGlobalType(typeText: string) {
    const commontypes = ['string', 'number', 'boolean'];
    return global.hasOwnProperty(typeText) || commontypes.includes(typeText)
  }

  private generateMockValue(typeNode: TypeNode | Type | undefined, typeName: string, objectLevel = 1): string {
    if (!typeNode) return 'undefined';

    const typeText = typeNode.getText();

    const type = typeNode instanceof TypeNode ? typeNode.getType() : typeNode;
      // check literal object type
      if (type.isObject?.() && !this.getExistingInterfaceOrType(typeText) && !this.isGlobalType(typeText) && !type.isArray()) {
        let result = '{\n'
        type.getProperties().forEach((prop) => {
          result+= `${' '.repeat(objectLevel)}       ${prop.getName()}: ${this.generateMockValue(
            prop.getValueDeclaration()?.getType(),
            prop.getName(),
            objectLevel+2
          )},\n`;
        })
        return result + `${' '.repeat(objectLevel)}      }`
    }
    return this.handleTypeText(typeText, typeName);
  }

  private getExistingInterfaceOrType(typeText: string) {
    console.log(typeText)
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

    switch (typeText) {
      case 'string':
        return 'faker.lorem.word()';
      case 'number':
        return 'faker.number.int()';
      case 'boolean':
        return 'faker.datatype.boolean()';
      case 'Date':
        return 'faker.date.recent()';
      default:
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
        if (
          this.sourceFile.getInterface(typeText) ||
          this.sourceFile.getTypeAlias(typeText)
        ) {
          return `${typeText}Mock.create()`;
        }
        return 'undefined'; // For unknown types
    }
  }
}

// Usage
const filePath = path.resolve(process.cwd(), './data-contracts.ts');
const outputPath = path.resolve(process.cwd(), `./src/mocks.ts`);
const generator = new MockGenerator({filePath, outputPath });
generator.generate();


console.log('Mock classes generated successfully!');