import { NavLink } from "react-router-dom";

export default function SubMenu() {
  const menuItems = [
    { name: "Profile", path: "/profile" },
    { name: "My Tickets", path: "/profile/mytickets" },
  ];

  return (
    <div className="flex flex-row gap-2 text-primary-white">
      {menuItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          className={({ isActive }) =>
            `pb-1 text-lg ${
              isActive
                ? "border-b-2 border-yellow-300"
                : "hover:border-b-2 border-transparent"
            }`
          }
        >
          {item.name}
        </NavLink>
      ))}
    </div>
  );
}
