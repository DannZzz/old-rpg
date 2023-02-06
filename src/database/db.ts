import { randomNumber } from "anytool"
import { FilterQuery, UpdateQuery, Model as MongooseModel } from "mongoose"

import Utils from "../utils/main.js"
import { CustomEvent } from "../utils/structures/CustomEvent.js"
import { Auth, AuthKeys, SpecId } from "./models/Auth.js"
import { User, UserKeys } from "./models/User.js"

const { ObjectFromKeys } = Utils

interface models {
  User: User
  Auth: Auth
}

const models: { [k in keyof models]: MongooseModel<models[k]> } = {
  User,
  Auth,
}

const keys = {
  UserKeys,
  AuthKeys,
}

export default class Database {
  static get<K extends keyof models>(modelName: K): Model<K, models[K]> {
    return new Model(modelName)
  }

  static async generateUnique<K extends keyof models>(
    modelName: K,
    key: keyof models[K],
    fn: () => any
  ) {
    const model = this.get(modelName)
    let v = fn()
    while (await model.findOne(key, v)) v = fn()
    return v
  }

  static async createUserOrGet(data: { specId: SpecId }) {
    const d = await this.get("User").findOne("specId", data.specId)
    if (d) return d

    const _ = () => randomNumber(1_000_000_000, 9_999_999_999)
    let _id = await this.generateUnique("User", "_id", _)
    const user = await this.get("User").createOne({
      _id: `${_id}`,
      specId: data.specId,
    })
    return user
  }
}

class Model<M extends keyof models, N extends models[M]> {
  readonly model: MongooseModel<any>
  constructor(private readonly modelName: M) {
    this.model = models[modelName]
  }

  async createOne(data: N): Promise<WithDocument<M>> {
    const md = await this.model.create(data)
    await md.save()
    return new Document(
      this.modelName,
      ObjectFromKeys(md, keys[keyString(this.modelName)]) as any
    ).typed()
  }

  async findOrCreate<K extends keyof N, V extends N[K]>(
    key: K,
    value: V
  ): Promise<WithDocument<M>> {
    const data = await this.model.findOne({ [key]: value })
    if (data)
      return new Document(
        this.modelName,
        ObjectFromKeys(data, keys[keyString(this.modelName)]) as any
      ).typed()
    const md = await this.model.create({ [key]: value })
    await md.save()
    return new Document(
      this.modelName,
      ObjectFromKeys(md, keys[keyString(this.modelName)]) as any
    ).typed()
  }

  async findOne<K extends keyof N, V extends N[K]>(
    key: K,
    value: V
  ): Promise<WithDocument<M>> {
    const d = (await this.model.findOne({ [key]: value })) || null
    if (!d) return d
    return new Document(
      this.modelName,
      ObjectFromKeys(d, keys[keyString(this.modelName)]) as any
    ).typed()
  }

  async findOneFilter(
    filter?: FilterQuery<models[M]>
  ): Promise<WithDocument<M>> {
    const d = (await this.model.findOne(filter)) || null
    if (!d) return d
    return new Document(
      this.modelName,
      ObjectFromKeys(d, keys[keyString(this.modelName)]) as any
    ).typed()
  }

  async findMany(filter?: FilterQuery<models[M]>): Promise<WithDocument<M>[]> {
    const d = (await this.model.find(filter)) || null
    if (!d) return d
    return d.map((doc) =>
      new Document(
        this.modelName,
        ObjectFromKeys(doc, keys[keyString(this.modelName)]) as any
      ).typed()
    )
  }

  async updateOne(
    filter?: FilterQuery<models[M]>,
    update?: UpdateQuery<models[M]>
  ) {
    await this.model.updateOne(filter, update)
  }

  async updateMany(
    filter?: FilterQuery<models[M]>,
    update?: UpdateQuery<models[M]>
  ) {
    await this.model.updateMany(filter, update)
  }

  async deleteOne(
    filter?: FilterQuery<models[M]>,
    update?: UpdateQuery<models[M]>
  ) {
    await this.model.deleteOne(filter, update)
  }

  async deleteMany(
    filter?: FilterQuery<models[M]>,
    update?: UpdateQuery<models[M]>
  ) {
    await this.model.deleteMany(filter, update)
  }
}

export type WithDocument<T extends keyof models> = Document<T> & models[T]

export class Document<T extends keyof models> {
  modelName: T

  constructor(modelName: T, data: models[T]) {
    Object.defineProperty(this, "modelName", {
      value: modelName,
      enumerable: false,
    })
    Object.assign(this, data)
  }

  typed(): WithDocument<T> {
    return this as any
  }

  json(): models[T] {
    return ObjectFromKeys(this, keys[keyString(this.modelName)]) as any
  }
}

function keyString(key: keyof models) {
  return `${key}Keys`
}
