import { productListByWarehouseId } from "../../../dbService/inventory.db";

export default async (req, res) => {
  const productList = await productListByWarehouseId(req.body.id);

  res.status(200).json({ productList });
};
