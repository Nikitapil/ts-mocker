interface IGetObjectTypeClassTemplateParams {
  name: string,
  values: Record<string, string>,
  isRecordType: boolean,
}

export const getTypeClassTemplate = (name: string, defaultValue: string) => {
  const overrideText = `override: ${name} = ${defaultValue}`
  return `
export class ${name}Mock {
  public static create(${overrideText}): ${name} {
    return override
  }
  
  public static createMany(count = 1, ${overrideText}): ${name}[] {
    return Array.from({ length: count }, () => this.create(override))  
  } 
}
`
}

export const getObjectValuesTemplate = (values: Record<string, string>, objectLevel = 0) => {
  const spaces = ' '.repeat(6 + objectLevel)
  return Object.keys(values).map(key => `${spaces}${key}: ${values[key]},`).join('\n');
}

export const getObjectTypeClassTemplate = ({name, values, isRecordType}: IGetObjectTypeClassTemplateParams) => {
  const overrideType = isRecordType ? `Partial<${name}>` : name;
  return `
export class ${name}Mock {
  public static create(overrides: ${overrideType} = {}): ${name} {
    return {
${getObjectValuesTemplate(values)}
      ...overrides
    };
  }
}
`
}