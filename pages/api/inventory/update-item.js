import {
  productListByWarehouseId,
  updateProductQuantity,
} from "../../../dbService/inventory.db";

export default async (req, res) => {
  const result = await updateProductQuantity(req.body.data);
  const productList = await productListByWarehouseId(req.body.id);

  res.status(200).json({ result, productList });
};
