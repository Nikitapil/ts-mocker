export const getTypeClassTemplate = (name: string, defaultValue: string) => {
  return `
export class ${name}Mock {
  public static create(override: ${name} = ${defaultValue}): ${name} {
    return override
   }
}
`
}

export const getObjectValuesTemplate = (values: Record<string, string>, objectLevel = 0) => {
  const spaces = ' '.repeat(6 + objectLevel)
  return Object.keys(values).map(key => `${spaces}${key}: ${values[key]},\n`).join('');
}

export const getObjectTypeClassTemplate = (name: string, values: Record<string, string>) => {
  return `
export class ${name}Mock {
  public static create(override: ${name} = {}): ${name} {
    return {
     ${getObjectValuesTemplate(values)}
    }
   }
}
`
}