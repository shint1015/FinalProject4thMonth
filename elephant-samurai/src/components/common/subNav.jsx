import { Link, useRouterState } from '@tanstack/react-router'

export default function SubMenu() {
  const router = useRouterState()

  const menuItems = [
    { name: "Profile", path: "/profile/info" },
    { name: "My Tickets", path: "/profile/mytickets" },
  ]

  return (
    <div className="flex flex-row gap-4 text-primary-white">
      {menuItems.map((item) => {
        const isActive = router.location.pathname.endsWith(item.path)

        return (
          <Link
            key={item.name}
            to={item.path}
            className={`text-body text-primary-white ${
              isActive
                ? "border-b-2 border-primary-yellow pb-2"
                : ""
            }`}
          >
            {item.name}
          </Link>
        )
      })}
    </div>
  )
}
