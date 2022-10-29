import axios, { Method, AxiosResponse } from "axios"
import { allowedMethods, timeoutSec, headers, apiUrl, formDataHeaders } from '@/config/global/Http';
import { IPayload } from "@/type/http/Http"

const service = axios.create({
  baseURL: apiUrl,
  headers: headers,
  timeout: timeoutSec * 1000
})

const serviceForm = axios.create({
  baseURL: apiUrl,
  headers: formDataHeaders,
  timeout: timeoutSec * 1000
})

export const $service = async (method: Method, url: string, payload: IPayload = {}): Promise<AxiosResponse<any, any>> => {
  if (!allowedMethods.includes(method)) {
    throw new Error(`Not allowed method: '${method}'`)
  }
  try {
    const response = await service.request({
      url: url,
      method: method,
      data: payload.body ?? null,
      params: payload.params ?? null
    })
    return response
  } catch (err) {
    throw err
  }
}

export const $serviceForm = async (method: Method, url: string, payload: IPayload = {}): Promise<AxiosResponse<any, any>> => {
  if (!allowedMethods.includes(method)) {
    throw new Error(`Not allowed method: '${method}'`)
  }
  try {
    const response = await serviceForm.request({
      url: url,
      method: method,
      data: payload.body ?? null,
      params: payload.params ?? null
    })
    return response
  } catch (err) {
    throw new Error(`Api error: '${String(err)}'`)
  }
}