// import { ProductFilled } from '.'

// This is the cart that is saved in local storage ( only ids saved)
export type ShoppingCartItem = {
  productId: string
  variants: VariantsState
  quantity: number
  extras: ExtrasState
  specification: string
}

export type ShoppingCart = {
  items: ShoppingCartItem[]
}

export type ShoppingCartItemFilled = {
  // product: ProductFilled
  variants: (VariantsState & { price: number })[]
  quantity: number
  extras: (ExtrasState & {
    name: string
    price: number
  })[]
}

export type ShoppingCartFilled = {
  items: ShoppingCartItemFilled[]
}

export type ExtrasState = {
  extraId: string
  quantity: number
}[]

export type VariantsState = {
  variantId: string
  selectionId: string
}[]
