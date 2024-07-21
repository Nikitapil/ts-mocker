export const getTypeClassTemplate = (name: string, defaultValue: string) => {
  return `
export class ${name}Mock {
  public static create(override: ${name} = ${defaultValue}): ${name} {
    return override
   }
}
`
}