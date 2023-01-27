import {
  deleteProduct,
  productListByWarehouseId,
} from "../../../dbService/inventory.db";

export default async (req, res) => {
  const result = await deleteProduct(req.body.idList);
  const productList = await productListByWarehouseId(req.body.id);

  res.status(200).json({ result, productList });
};
