import path from "path"
import fs from "fs"
import Hero from "../heroes/typing/Hero"
import HeroChest from "../heroes/typing/HeroChest"
import {
  HeroCollection,
  HeroCollectionsChest,
} from "../heroes/collections/Collection"
import { Pack, PacksChest } from "../game/packs/Packs"

export default async function HeroHandler() {
  const eventFolder = fs
    .readdirSync(path.join(__dirname, "../heroes/list"))
    .filter((c) => c.endsWith(".ts") || c.endsWith(".js"))
  for (let eventFileName of eventFolder) {
    const event = (await importFile(
      path.join(__dirname, "../heroes/list/" + eventFileName)
    )) as Hero
    HeroChest.set(event.id, event)
  }

  const packFolder = fs
    .readdirSync(path.join(__dirname, "../game/packs/list"))
    .filter((c) => c.endsWith(".ts") || c.endsWith(".js"))
  for (let packFileName of packFolder) {
    const pack = (await importFile(
      path.join(__dirname, "../game/packs/list/" + packFileName)
    )) as Pack
    PacksChest.set(pack.id, pack)
  }

  const collectionFolder = fs
    .readdirSync(path.join(__dirname, "../heroes/collections/list"))
    .filter((c) => c.endsWith(".ts") || c.endsWith(".js"))
  for (let collectionFileName of collectionFolder) {
    const collection = (await importFile(
      path.join(__dirname, "../heroes/collections/list/" + collectionFileName)
    )) as HeroCollection
    HeroCollectionsChest.set(collection.id, collection)
  }
}

async function importFile(path: string) {
  return (await import(path))?.default?.default
}
