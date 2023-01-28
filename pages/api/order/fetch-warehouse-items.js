// fetchWarehouseByBusinessId

import { productListByWarehouseId } from "../../../dbService/inventory.db";

export default async (req, res) => {
  const warehouse = await productListByWarehouseId(req.body.warehouseId);

  res.status(200).json({ status: 200, warehouse });
};
