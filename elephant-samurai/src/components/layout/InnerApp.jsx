import { RouterProvider } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { useAuth } from '@/hook/useAuth'
import router from '@/route'

const InnerApp = () => {
    const auth = useAuth()
    return (
        <>
            <RouterProvider router={router} context={{ auth }} />
            <TanStackRouterDevtools router={router} />
        </>
    )
}

export default InnerApp