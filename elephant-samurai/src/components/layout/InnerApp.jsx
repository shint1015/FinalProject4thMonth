import { RouterProvider } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { useAuth } from '@/hook/useAuth'
import { useEffect, useRef } from 'react'
import router from '@/route'

const InnerApp = () => {
    const auth = useAuth()

    const authRef = useRef(auth)
    useEffect(() => {
        authRef.current = auth
    }, [auth])

    if (auth.isLoading) {
        return (
            <div className='min-h-screen flex items-center justify-center text-primary-white'>
                Loading...
            </div>
        )
    }

    return (
        <>
            <RouterProvider router={router} context={{ auth }} />
            {/* <TanStackRouterDevtools router={router} /> */}
        </>
    )
}

export default InnerApp
