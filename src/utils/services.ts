import { API_URL } from './url'
import { Product } from '../types'

export const getItems = async (): Promise<Product[]> => {
    const resp = await fetch(API_URL)
    const json: Product[] = await resp.json()
    return json?.map(item => ({
        id: item.id,
        title: item.title,
        description: item.description,
        category: item.category,
        image: item.image,
        price: item.price
      }))
} 