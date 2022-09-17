import {Order} from './mockOrders';
import * as admin from 'firebase-admin';
import {faker} from '@faker-js/faker';

export interface OrderProps {
    date: Date
    total: number
    subTotal: number
    orderNumber: number
  }

export const mapOrders = (orderList:Order[])=>{
  const order = orderList.map((order) => ({
    date: ( order.date as unknown as admin.firestore.Timestamp)
        .toDate(),
    total: order.importeTotal,
    subTotal: order.importeTotal,
    orderNumber: order.orderNumber,
  }));
  return order;
};

export const substractDates = (f1: string, f2: string) => {
  const date1 = f1.split('/');
  const date2 = f2.split('/');
  const dDate1 = Date.UTC(
      Number(date1[2]),
      Number(date1[1]) - 1,
      Number(date1[0])
  );
  const dDate2 = Date.UTC(
      Number(date2[2]),
      Number(date2[1]) - 1,
      Number(date2[0])
  );
  const diff = dDate2 - dDate1;
  const numdays = Math.floor(diff / (1000 * 60 * 60 * 24));
  return numdays;
};

export const getDate = (day: string) => new Date(day);

export const randomDate = (start: Date, end: Date): Date => {
  return new Date(
      start.getTime() +
      (Number(faker.random.numeric(3)) / 1000) *
        (end.getTime() - start.getTime())
  );
};
