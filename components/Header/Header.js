import React, { useEffect } from "react";
import "./Header.scss";
import Logo from "../Logo/Logo";
import Link from "next/link";
import useAuth from "../../hooks/useAuth";
import { useRouter } from "next/router";

function Header({ currentItem }) {
  const router = useRouter();
  const { login, logout, user } = useAuth();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 1) {
        document.querySelector(".HeaderWrapper").style.height = "70px";
      } else {
        document.querySelector(".HeaderWrapper").style.height = "";
      }
    });
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  });

  return (
    <div className="HeaderWrapper">
      <div className="Header">
        <Logo isBlack={false} isSmall={false} />
        <ul className="Header__menu">
          <li
            className={`Header__menu--${
              currentItem === "home" ? "activeItem" : "item"
            }`}
          >
            <Link href="/">Home</Link>
          </li>

          <li
            className={`Header__menu--${
              currentItem === "about" ? "activeItem" : "item"
            }`}
          >
            <Link href="/about">About</Link>
          </li>
          <li
            className={`Header__menu--${
              currentItem === "contact" ? "activeItem" : "item"
            }`}
          >
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
        <div className="Header__actions">
          {user === null ? (
            <button
              className="Header__actions--button dark"
              data-icon={String.fromCharCode(60023)}
              title="Sign in with Google"
              onClick={async () => await login(router)}
            />
          ) : (
            <>
              <Link
                href="/app/warehouse"
                className="Header__actions--button dark"
                data-icon={String.fromCharCode(59505)}
                title="Cart"
              />
              <button
                className="Header__actions--button dark"
                data-icon={String.fromCharCode(59834)}
                title="Log out"
                onClick={async () => await logout(router)}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
