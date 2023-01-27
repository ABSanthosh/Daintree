import {
  deleteWarehouse,
  fetchAllWarehouses,
} from "../../../dbService/warehouse.db";

export default async (req, res) => {
  const result = await deleteWarehouse(req.body.id);
  const warehouse = await fetchAllWarehouses();

  res.status(200).json({ status: 200, result, warehouse });
};
