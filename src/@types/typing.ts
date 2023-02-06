export type ObjectType<
  K extends keyof any = any,
  V extends { [k in any]: any } = any,
  O extends boolean = false
> = O extends true ? { [k in K]?: V[k] } : { [k in K]: V[k] }
