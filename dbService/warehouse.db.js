import db from "../lib/prisma";

export function fetchAllWarehouses() {
  return db.warehouse.findMany();
}

export function addNewWarehouse(data) {
  return db.warehouse.create({
    data,
  });
}

export function updateWarehouse(warehouse) {
  return db.warehouse.update({
    where: {
      id: warehouse.id,
    },
    data: {
      name: warehouse.name,
      country: warehouse.country,
      maxQuantity: warehouse.maxQuantity,
    },
  });
}

export function deleteWarehouse(id) {
  return db.warehouse.delete({
    where: {
      id,
    },
  });
}
