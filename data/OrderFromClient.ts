import { ShoppingCart } from './ShoppingCart'

export type RestaurantOrderFromClient = OrderFromClient &
  RestaurantAditionalFields

export type OrderFromClient = {
  cart: ShoppingCart
  referralCode: string
  client: ClientInformation
  creationDeviceId: CreationOrderDevice
  invoice?: InvoiceClientInformation
  formaPago: string // TODO: Esto puede ser un enum? o cuales son las posibles formas de pago
}

export type CreationOrderDevice = {
  type: 'client' | 'admin' | 'employee'
  id: string // en caso de que sea client usara el valor enviado atraves del cookie para identificar al usuario, caso contrario el id del documento
}

export type InvoiceClientInformation = {
  // SRI - Cliente - Para la factura
  tipoIdentificacionComprador: string
  identificacionComprador: string
}

export type ClientInformation = {
  // Informacion del cliente almacenar
  nombres: string
  apellidos: string
  correo: string
  telefono: string
  direccion: string
}

export type RestaurantAditionalFields = {
  propina?: number
  // Tables
  table: string
  tableStr: string
}

export type DeliveryAditionalFields = {
  // Delivery
  deliveryPrice: number
  referenciaDireccion: string
}
