import * as fs from 'fs';
import {
  Project,
  SourceFile,
  InterfaceDeclaration,
  TypeAliasDeclaration,
  TypeNode,
  Type
} from 'ts-morph';

class MockGenerator {
  private project: Project;
  private sourceFile: SourceFile;
  private generatedTypes: Set<string>;
  private sourceFileName: string;
  private enums: Record<string, string[]>;

  constructor(filePath: string) {
    this.project = new Project();
    this.sourceFile = this.project.addSourceFileAtPath(filePath);
    this.generatedTypes = new Set();
    this.sourceFileName = filePath.replace(/\.ts$/, '');
    this.enums = this.sourceFile.getEnums().reduce((acc: Record<string, string[]>, enumDeclaration) => {
      const name = enumDeclaration.getName()
      const members = enumDeclaration.getMembers().map(member => member.getName())
      acc[name] = members
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
    return output;
  }

  private prepareTypesImports(typesNames: string[]) {

    return `import { ${ typesNames.join(', ') } } from '${
      this.sourceFileName
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

    let output = `export class ${name}Mock {\n`;
    output += `  public static create(): ${name} {\n`;
    output += `    return {\n`;

    if (declaration instanceof InterfaceDeclaration) {
      declaration.getProperties().forEach((prop) => {
        output += `      ${prop.getName()}: ${this.generateMockValue(
          prop.getTypeNode(), 
        )},\n`;
      });
    } else {
      const type = declaration.getType();
      if (type.isObject()) {
        type.getProperties().forEach((prop) => {
          output += `      ${prop.getName()}: ${this.generateMockValue(
            prop.getValueDeclaration()?.getType()
          )},\n`;
        });
      } else {
        output += `      ${this.generateMockValue(
          declaration.getTypeNode()
        )}\n`;
      }
    }

    output += `    };\n`;
    output += `  }\n`;
    output += `}\n\n`;

    return output;
  }

  private generateMockValue(typeNode: TypeNode | Type | undefined): string {
    if (!typeNode) return 'undefined';

    if (typeNode instanceof TypeNode) {
      const typeText = typeNode.getText();
      console.log(typeText)
      return this.handleTypeText(typeText);
    } else {

      // Handle ts.Type
      // if (typeNode.isStringLiteral()) return `'${typeNode.getValue()}'`;
      // if (typeNode.isNumberLiteral()) return typeNode.getValue().toString();
      // if (typeNode.isBoolean()) return typeNode.isTrue() ? 'true' : 'false';
      // if (typeNode.isEnumLiteral()) return `'${typeNode.getValue()}'`;


      // For other types, try to get the text representation
      const typeText = typeNode.getText();
      return this.handleTypeText(typeText);
    }
  }

  private handleTypeText(typeText: string): string {
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
          return `[${this.handleTypeText(innerType)}, ${this.handleTypeText(
            innerType
          )}]`;
        }
        // Check if it's a nested type from the same file
        if (
          this.sourceFile.getInterface(typeText) ||
          this.sourceFile.getTypeAlias(typeText)
        ) {
          // Generate the mock class for the nested type if not already generated
          if (!this.generatedTypes.has(typeText)) {
            const nestedDeclaration =
              this.sourceFile.getInterface(typeText) ||
              this.sourceFile.getTypeAlias(typeText);
            if (nestedDeclaration) {
              this.generateMockClass(nestedDeclaration);
            }
          }
          return `${typeText}Mock.create()`;
        }
        return 'undefined'; // For unknown types
    }
  }
}

// Usage
const filePath = './data-contracts.ts';
const generator = new MockGenerator(filePath);
const output = generator.generate();

fs.writeFileSync('generated_mocks.ts', output);
console.log('Mock classes generated successfully!');