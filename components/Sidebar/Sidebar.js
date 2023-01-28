import React, { useState } from "react";
import "./Sidebar.scss";
import Logo from "../Logo/Logo";
import Link from "next/link";
import useAuth from "../../hooks/useAuth";
import { useRouter } from "next/router";

export default function Sidebar({ activePage }) {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  const sideBarItems = [
    {
      name: "Warehouse",
      icon: String.fromCharCode(60344),
      link: "/app/warehouse",
    },
    {
      name: "Inventory",
      icon: String.fromCharCode(57721),
      link: "/app/inventory",
    },
    {
      name: "Orders",
      icon: String.fromCharCode(61294),
      link: "/app/orders",
    },
  ];

  return (
    <nav className={`Sidebar ${isOpen ? "Sidebar--open" : ""}`}>
      <Logo isSmall={!isOpen} isBlack={false} />
      <ul className="Sidebar__options">
        {sideBarItems.map((item, index) => (
          <li
            key={index}
            className={`Sidebar__options--${
              activePage === index + 1 ? "activeItem" : "item"
            }`}
          >
            <Link href={item.link}>
              <span data-icon={item.icon} title={!isOpen ? item.name : ""} />
              <p>{item.name}</p>
            </Link>
          </li>
        ))}
        <li className="Sidebar__options--item">
          <button
            className={`${
              isOpen ? "Sidebar__toggle--active" : "Sidebar__toggle"
            }`}
            onClick={() => setIsOpen(!isOpen)}
            data-icon={String.fromCharCode(58828)}
          />
        </li>
      </ul>
    </nav>
  );
}
