import { useState } from "react";
import "./NewSkuInput.scss";

function NewSkuInput({ sku, setNewSkuList, setOnNewSku }) {
  const [localSkuData, setLocalSkuData] = useState(sku);
  return (
    <div className="NewSkuInputWrapper">
      <button
        data-icon={String.fromCharCode(58829)}
        onClick={() => setOnNewSku(false)}
      />
      <input
        type="text"
        value={localSkuData.name}
        placeholder="Item Name"
        onChange={(e) =>
          setLocalSkuData({
            ...localSkuData,
            name: e.target.value,
          })
        }
      />

      <input
        type="number"
        placeholder="Quantity"
        onChange={(e) =>
          setLocalSkuData({
            ...localSkuData,
            quantity: e.target.value !== "" ? parseInt(e.target.value) : 0,
          })
        }
      />
      <span>Kg</span>
      <button
        data-icon={String.fromCharCode(57669)}
        onClick={() => {
          if (localSkuData.itemName === "") return;
          setNewSkuList((prev) => [...prev, localSkuData]);
          setOnNewSku(false);
        }}
      />
    </div>
  );
}

export default NewSkuInput;
