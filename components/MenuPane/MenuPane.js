import React from "react";
import "./MenuPane.scss";

function MenuPane({ isOpen, setIsOpen, children, style }) {
  return (
    <>
      {isOpen && (
        <div className="MenuPaneWrapper">
          <div className="MenuPane" style={style}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="MenuPane--close dark"
              data-icon={String.fromCharCode(58829)}
            />
            {children}
          </div>
        </div>
      )}
    </>
  );
}

export default MenuPane;
