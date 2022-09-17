import {generateMock} from '@anatine/zod-mock';
import {z} from 'zod';

import {clientInformationSchema, creationOrderDeviceSchema,
  currencySchema,
  shoppingCartFilledSchema} from './schema';

// mockOrder
const orderSchema = z.object({
  date: z.date().min(new Date('2022-01-02'))
      .max(new Date('2022-03-02')), // este
  items: shoppingCartFilledSchema,
  client: clientInformationSchema,
  orderNumber: z.number(), // este
  creationDeviceId: creationOrderDeviceSchema,
  formaPago: z.literal('Efectivo'),
  totalSinImpuestos: z.number().min(50).max(70),
  currency: currencySchema,
  totalConImpuestos: z.object({
    totalImpuesto: z.object({
      codigo: z.literal('doce'),
      codigoPorcentaje: z.literal('doce'),
      baseImponible: z.string(),
      tarifa: z.literal('doce'),
      valor: z.literal('Tarifa base imponible'),
    }),
  }),
  importeTotal: z.number().max(50), // total ventas // este
  pagos: z.object({
    pago: z.object({
      formaPago: z.literal('Efectivo'),
      total: z.number().min(50).max(70),
      plazo: z.literal(1),
      unidadTiempo: z.literal(1),
    }),
  }),

});

export type Order = z.infer<typeof orderSchema>;

export const mockData = () => generateMock(orderSchema);

