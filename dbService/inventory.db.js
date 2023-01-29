import db from "../lib/prisma";

export function productListByWarehouseId(id) {
  return db.product.findMany({
    where: {
      warehouseId: id,
    },
    include: {
      warehouse: true,
    },
  });
}

export function updateProductQuantity(products) {
  const temp = products.map((product) =>
    db.product.update({
      where: {
        id: product.id,
      },
      data: {
        quantity: product.quantity,
      },
    })
  );

  return Promise.all(temp);
}

export function deleteProduct(idList) {
  return db.product.deleteMany({
    where: {
      id: {
        in: idList,
      },
    },
  });
}

export function addNewProduct(data) {
  return db.product.createMany({
    data,
  });
}
