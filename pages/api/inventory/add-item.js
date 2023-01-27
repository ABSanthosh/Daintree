import {
  addNewProduct,
  productListByWarehouseId,
} from "../../../dbService/inventory.db";

export default async (req, res) => {
  const result = await addNewProduct(req.body.map((item) => item.data));
  const productList = await productListByWarehouseId(req.body.id);

  res.status(200).json({ result, productList });
};
