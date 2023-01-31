export const PORT = +processOr("PORT", 5000)

export const WebName = processOr("WebName", "http://localhost:5000")

export const MONGO_URI = processOr(
  "MONGO_URI",
  "mongodb+srv://dann:meri@jasmy-cluster.sl3qlnm.mongodb.net/old-rpg?retryWrites=true&w=majority"
)

export function processOr(key: string, defaultVal: any = null) {
  return key in process.env ? process.env[key] : defaultVal
}
