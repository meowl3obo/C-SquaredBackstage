import { $service, $serviceForm } from './index'

export const createProduct = async (productData: FormData) => {
    const response = await $serviceForm("POST", "/back/product", { body: productData })
    return response
}