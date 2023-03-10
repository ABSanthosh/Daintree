import db from "../lib/prisma";

export function fetchAllWarehouses(id) {
  return db.warehouse.findMany({
    where: {
      userId: id,
    },
  });
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

export function fetchWarehouseById(id) {
  return db.warehouse.findUnique({
    where: {
      id,
    },
    include: {
      product: true,
    },
  });
}

export function fetchWarehouseByBusinessId(id) {
  return db.warehouse.findMany({
    where: {
      userId: id,
    },
  });
}
