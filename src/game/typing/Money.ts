import Utils from "../../utils/main"
import { ObjectType } from "./any"

export type MoneyType = "primary" | "secondary"

export type Price = Money | Cost

class Money {
  constructor(value: 0)
  constructor(invalid: "invalid")
  constructor(value: number | "invalid", type: MoneyType)
  constructor(
    public readonly value: number | "invalid",
    public readonly type?: MoneyType
  ) {}
}

export class RandomMoney {
  private _amount: number
  private _type?: MoneyType
  getAmount?: () => number

  get type() {
    return this._type
  }

  fixedAmount() {
    this._amount = this.getAmount()
    return this
  }

  get amount() {
    return this._amount || this.fixedAmount?.()?._amount || 0
  }

  constructor()
  constructor(type: MoneyType, getAmount: () => number)
  constructor(type?: MoneyType, getAmount?: () => number) {
    if (type) this._type = type
    if (getAmount?.()) this.getAmount = getAmount
  }
}

export class Cost {
  private _type?: MoneyType
  private _amount?: number
  private _sale?: Cost

  get type(): MoneyType {
    return this._sale ? this._sale.type : this._type
  }

  get amount(): number {
    return this._sale ? this._sale.amount : this._amount
  }

  get sale() {
    return this._sale || null
  }

  isEnough(data: ObjectType<MoneyType, number, true>) {
    if (!this.type) return null
    return this.amount <= data[this.type]
  }

  constructor()
  constructor(type: MoneyType, amount: number)
  constructor(type: MoneyType, amount: number, sale: Cost)
  constructor(type?: MoneyType, amount?: number, sale?: Cost) {
    if (type) this._type = type
    if (amount || amount === 0) this._amount = amount
    if (sale) this._sale = sale
  }
}

export default Money
