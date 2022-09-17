// import { Currency } from './Local'
import {
  ClientInformation,
  CreationOrderDevice,
  DeliveryAditionalFields,
  InvoiceClientInformation,
  RestaurantAditionalFields,
} from './OrderFromClient'
import { ShoppingCartFilled } from './ShoppingCart'

export type RestaurantStates = {
  notPaid: number // Valores de la orden no pagados aun
  ready: boolean
  readyTime: number // ms
  done: boolean
  doneTime: number
  paid: boolean
  paidTime: number
  serve: boolean
  serveTime: number
  canceled: boolean
  canceledReason: string
  canceledTime: number
}

export type DeliveryState = {
  accepted: boolean
  acceptedTime: number
  expectedTime: number
}

export type Order = {
  date: Date
  items: ShoppingCartFilled
  total: number
  subTotal: number
  referralCode: string // Si uso algun cupon o codigo
  client: ClientInformation
  orderNumber: number
  creationDeviceId: CreationOrderDevice
  // Bandera de si es factura con datos o consumidor final
  factura: boolean
  formaPago: string // TODO: Esto puede ser un enum? o cuales son las posibles formas de pago
  totalSinImpuestos: number
  totalDescuento: number
  // currency: Currency
  totalConImpuestos?: {
    totalImpuesto: {
      codigo: string
      codigPorcentaje: string
      baseImponible: string
      tarifa: string
      valor: string
    }
  }
  pagos?: {
    pago: {
      formaPago: string
      total: number
      plazo: number
      unidadTiempo: number
    }
  }
  invoice?: InvoiceClientInformation
  deliveryClientInformation?: DeliveryAditionalFields
}

export type RestaurantOrder = Order &
  RestaurantStates &
  RestaurantAditionalFields
