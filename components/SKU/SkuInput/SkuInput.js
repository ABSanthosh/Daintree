import React from "react";
import "./SkuInput.scss";

function SkuInput({
  sku,
  onRemove = () => {},
  onQuantityChange = () => {},
  newSkuList,
  updatedSkuList,
  deleteSkuList,
}) {
  const changeType = () => {
    if (newSkuList.find((i) => i.id === sku.id)) {
      return "new";
    } else if (deleteSkuList.find((i) => i.id === sku.id)) {
      return "delete";
    } else if (updatedSkuList.find((i) => i.id === sku.id)) {
      return "update";
    } else {
      return "";
    }
  };

  return (
    <div className={`SkuInputWrapper SkuInputWrapper--${changeType()}`}>
      <button
        data-icon={String.fromCharCode(
          changeType() === "delete" ? 58829 : 59506
        )}
        onClick={() => onRemove(sku)}
      />

      <p>{sku.name}</p>
      <input
        type="number"
        onFocus={(e) => e.target.select()}
        value={sku.quantity || 0}
        placeholder="Quantity"
        disabled={changeType() === "delete"}
        onChange={(e) => {
          onQuantityChange({
            ...sku,
            quantity: e.target.value !== "" ? parseInt(e.target.value) : 0,
          });
        }}
      />
      <span>Kg</span>
    </div>
  );
}

export default SkuInput;
