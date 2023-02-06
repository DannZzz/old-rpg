import { formatNumber } from "anytool"
import { ObjectType } from "../@types/typing.js"

class Utils {
  /**
   * @param obj any object
   * @param keys keys array
   * @returns object with keys of array
   */
  static ObjectFromKeys<O extends ObjectType, A extends readonly string[]>(
    obj: O,
    keys: A
  ): ObjectType<A[number], O[A[number]]> {
    const _obj = {} as any
    for (let key in obj) {
      if (keys.includes(key)) {
        _obj[key] = obj[key]
      }
    }
    return _obj
  }

  static formatNumber(number: number) {
    return formatNumber(Math.round(number))
  }

  static wr(games: number, wins: number): string {
    return (((wins || 0) / (games || 0)) * 100 || 0).toFixed(1) + "%"
  }

  static percentOf(sum: number, percent: number) {
    return Math.round((percent / 100) * sum)
  }

  static isLimited(date: Date) {
    return date ? date > new Date() : false
  }

  static andOr(array: string[], or?: boolean) {
    return array
      .map((n, i) => {
        let symbol = ", "
        if (i === array.length - 1) {
          symbol = ""
        } else if (i === array.length - 2) {
          symbol = or ? " или " : " и "
        }
        return `${n}${symbol}`
      })
      .join("")
  }
}
export default Utils
