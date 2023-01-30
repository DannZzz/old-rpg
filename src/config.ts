export const PORT = +processOr("PORT", 5000)

export const WebName = processOr("WebName", "http://localhost:5000")

export function processOr(key: string, defaultVal: any = null) {
  return key in process.env ? process.env[key] : defaultVal
}
