import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import {mockData, Order} from './mockOrders';
import {mapOrders, getDate, randomDate} from './utils';
admin.initializeApp();
const db = admin.firestore();
db.settings({ignoreUndefinedProperties: true});
const col = db.collection('orders');
const batch = db.batch();

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};

exports.addOrder = functions.https.onRequest(async (req, res) => {
  for (let i = 0; i < 200; i++) {
    const data = mockData();
    data.orderNumber = i;

    const fecha = randomDate(new Date('2022-08-01'), new Date('2022-08-31'));
    data.date = fecha;
    const docRef = db.collection('orders').doc(`${data.orderNumber}`);

    batch.set(docRef, data);
  }
  await batch.commit();
  res.status(200).json({successfull: true});
});

// query to get orders ordered by dates
const query = async (): Promise<admin.firestore.DocumentData[]> =>
  await col
      .orderBy('date', 'asc')
      .get()
      .then((querySnapshot) => {
        const documents = querySnapshot.docs.map((doc) => doc.data());
        return documents;
      });

// map orders to get only days
const mapDays = (orderList: admin.firestore.DocumentData[]) => {
  return orderList.map((order) => ({
    date: (order.date as unknown as admin.firestore.Timestamp).toDate(),
  }));
};

// get days for stablish first and last days for date picker
exports.getDatePickerDaysRange = functions.https.onRequest(async (req, res) => {
  const daysRange = await await query().then(mapDays);
  const minDate = daysRange[0];
  const maxDate = daysRange.slice(-1)[0];
  res.header(headers);
  res.json({minDate, maxDate});
});

// mapOrders to the Order type from Stadistics
exports.getOrdersRange = functions.https.onRequest(async (req, res) => {
  try {
    let body = req.body;
    if (typeof body === 'string') {
      body = JSON.parse(req.body);
    }
    console.log(body);
    const dayBefore = getDate(body.dayBefore);
    const firstDay = getDate(body.firstDay);
    const lastDay = getDate(body.lastDay);

    const currentOrders = mapOrders(
      (await getOrder(firstDay, sumDate(lastDay, 1))) as Order[]
    );
    const pastOrders = mapOrders(
      (await getOrder(dayBefore, firstDay)) as Order[]
    );
    const orders = {currentOrders, pastOrders};
    res.header(headers);
    res.json(orders);
  } catch (error) {
    res.header(headers);
    res.json('Error');
  }
});

// get orders from specific days range
const getOrder = async (firstDay: Date, lastDay: Date) => {
  // if (substractDates(
  //     firstDay.toLocaleDateString(),
  //     lastDay.toLocaleDateString()) > 31) {

  const orderList = await col
      .where('date', '>', firstDay)
      .where('date', '<', lastDay)
      .orderBy('date', 'asc')
      .get()
      .then((querySnapshot) => {
        const documents = querySnapshot.docs.map((doc) => doc.data());
        return documents;
      });
  return orderList;
  // }
  // return 'Error';
};

const sumDate = (date: Date, num: number) => {
  const today = date.toUTCString();
  const pastDay = new Date(today);
  pastDay.setDate(pastDay.getDate() + num);
  return pastDay;
};
