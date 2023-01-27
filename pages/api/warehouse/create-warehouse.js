import {
  addNewWarehouse,
  fetchAllWarehouses,
} from "../../../dbService/warehouse.db";

export default async (req, res) => {
  const result = await addNewWarehouse(req.body);
  const warehouse = await fetchAllWarehouses();

  res.status(200).json({ status: 200, result, warehouse });
};
