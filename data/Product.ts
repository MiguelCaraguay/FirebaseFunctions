import { Extra, WithId } from '..'
import { ContentImage } from './ContentImage'

export interface Product extends ContentImage {
  name: string
  available: boolean
  display: boolean
  description: string
  slug: string
  price: number
  estimatatedTime?: EstimatedTime
  index: number
  category: string
  variants?: Variant[]
}

export type EstimatedTime = {
  type: 'min' | 'hour' | 'day'
  number: number
}

export type VariantItem = { id: string; price?: number }

export interface Variant {
  id: string
  items: VariantItem[]
}

export type ProductFilled = WithId<Product> & {
  extras: WithId<Extra>[]
}
export type ProductToCreate = Omit<Product, 'slug'>
