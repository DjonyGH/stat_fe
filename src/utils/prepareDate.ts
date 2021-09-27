export const prepareDate: (value: string) => string = (value: string) => {
  const dateAsArray: string[] = value.split('-')
  return `${dateAsArray[2]}.${dateAsArray[1]}.${dateAsArray[0]}`
}
