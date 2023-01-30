export type ObjectType<
  K extends keyof any = string,
  V = any,
  A = false
> = A extends true ? { [k in K]?: V } : { [k in K]: V }
