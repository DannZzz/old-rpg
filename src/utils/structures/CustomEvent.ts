import { Chest } from "anytool"
import HeroName from "../../configuration/HeroNaming"
import { MoneyType } from "../../game/typing/Money"

type Response<T extends ReadonlyArray<any> | Array<T>> = [...T, Date]

export interface CustomEvents {
  moneyChange: [Money: { type: MoneyType; targetId: string; amount: number }]
  userXpChange: [
    OldUser: { userId: string; xp: number },
    NewUser: { userId: string; xp: number }
  ]
  skinAdd: [Data: { userId: string; heroId: HeroName; skinId: string }]
}

const listeners = new Chest<
  keyof CustomEvents,
  Array<(...args: Response<CustomEvents[keyof CustomEvents]>) => Awaited<void>>
>()
export class CustomEvent {
  constructor() {}

  emit<E extends keyof CustomEvents, T extends CustomEvents[E]>(
    event: E,
    ...data: T
  ) {
    const a = data[0]
    const thisEvent = listeners.get(event)
    if (!thisEvent) return
    ;(thisEvent as any[]).forEach((fn) => fn(...data, new Date()))
  }

  static on<E extends keyof CustomEvents>(
    event: E,
    callback: (...args: Response<CustomEvents[E]>) => Awaited<void>
  ) {
    const thisEvent = listeners.get(event)
    if (!thisEvent) {
      listeners.set(event, [callback as any])
    } else {
      listeners.set(event, [...thisEvent, callback] as any)
    }
  }
}
