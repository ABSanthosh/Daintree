import React from "react";
import "./FancyInput.scss";

function FancyInput({ type, placeholder, onChange, value }) {
  return (
    <input
      className="FancyInput"
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default FancyInput;
