import {
    updateWarehouse,
    fetchAllWarehouses,
  } from "../../../dbService/warehouse.db";
  
  export default async (req, res) => {
    const result = await updateWarehouse(req.body);
    const warehouse = await fetchAllWarehouses(req.body.userId);
  
    res.status(200).json({ status: 200, result, warehouse });
  };
  