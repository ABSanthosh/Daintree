import { fetchOrders, placeOrder } from "../../../dbService/order.db";

export default async (req, res) => {
  await placeOrder(req.body.data);
  const orders = await fetchOrders(req.body.id);

  res.status(200).json({ status: 200, orders });
};
