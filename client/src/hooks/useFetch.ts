import axios from "axios"
import { SERVER_API } from "../contants"

export default function useFetch(serverUrl?: string) {
  async function request(
    url: string,
    options: {
      method?: "get" | "post" | "put" | "delete"
      query?: Record<string, string>
      body?: any
    } = {}
  ) {
    return axios({
      url:
        (serverUrl || SERVER_API) +
        url +
        (options?.query ? `?${new URLSearchParams(options.query)}` : ""),
      method: options?.method || "get",
      data: options?.body,
    })
  }
  return request
}
