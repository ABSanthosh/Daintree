import db from "../lib/prisma";

export function fetchBusinesses() {
  return db.user.findMany({
    include: {
      Warehouse: true,
    },
  });
}

export async function placeOrder(data) {
  const order = await db.order.create({
    data: {
      id: data.id,
      userId: data.userId,
      description: data.description,
      fromWarehouseId: data.fromBusiness,
      toWarehouseId: data.toBusiness,
    },
  });

  const orderItems = await db.orderItem.createMany({
    data: data.selectedProducts.map((item) => {
      return {
        orderId: order.id,
        productId: item.id,
        quantity: item.quantity,
      };
    }),
  });

  return Promise.all([order, orderItems]);
}

export function fetchOrders(id) {
  return db.order.findMany({
    where: {
      userId: id,
    },
  });
}
