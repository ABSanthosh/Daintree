import React from "react";
import "./Logo.scss";

function Logo({ isBlack = true, isSmall = true }) {
  if (isSmall) return <img className="Logo" src="/Img/LogoSmallWhite.svg" />;
  if (isBlack) return <img className="Logo" src="/Img/LogoDark.svg" />;
  return <img className="Logo" src="/Img/LogoWhite.svg" />;
}

export default Logo;
