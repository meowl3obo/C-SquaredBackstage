import { $service } from './index'

export const GetClassifies = async () => {
  const response = await $service("GET", "/back/classify")
  return response
}