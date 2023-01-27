import React from "react";
import "./FancyInput.scss";

function FancyInput({ type, placeholder, onChange }) {
  return (
    <input
      className="FancyInput"
      type={type}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default FancyInput;
