import { Outlet } from '@tanstack/react-router';
import SubMenu from '@/components/common/subNav'
import { useAuth } from '@/hook/useAuth'
import { Link, useNavigate } from '@tanstack/react-router'

// call default from API to add info in place hodler

export default function Profile(){
    const { user, isLoading, isAuthenticated } = useAuth()
    const navigate = useNavigate()

    // wait until this page get user info
    if (isLoading) {
        return <>loading...</>
    }
    // if user dont login, redirect to top page
    if (!isAuthenticated) {
        navigate({ to: '/' })
    }

    return (
        <>
        <div className='px-[2rem] sm:px-[3rem] lg:px-[5rem]'>
            <h4 className="mt-8 text-primary-yellow text-h4 mb-6">Welcome back {user.name}!</h4>
            <SubMenu/>
        </div>
        <Outlet /> 
        </>
    )
}