import { useState } from "react";
import "./SkuOrderInput.scss";

function SkuOrderInput({ sku, onChange, onRemove }) {
  return (
    <div className="SkuOrderInputWrapper">
      <button
        data-icon={String.fromCharCode(58829)}
        onClick={() => onRemove(sku.id)}
      />

      <p>{sku.name}</p>

      <input
        type="number"
        placeholder="Quantity"
        value={sku.quantity}
        onFocus={(e) => e.target.select()}
        onChange={(e) => {
          onChange({
            ...sku,
            quantity:
              parseInt(e.target.value) <= sku.maxQuantity
                ? parseInt(e.target.value)
                : 0,
          });

          if (parseInt(e.target.value) === 0) e.target.select();
        }}
      />
      <span>/{sku.maxQuantity}</span>
      <span>Kg</span>
    </div>
  );
}

export default SkuOrderInput;
