import { Outlet } from '@tanstack/react-router';
import SubMenu from '@/components/common/subNav'
import { useAuth } from '@/hook/useAuth'
import { Link, useNavigate } from '@tanstack/react-router'

// call default from API to add info in place hodler

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
            {/* form */}
            <form className='mt-4'>
                <div>
                    <p className='text-subbody text-dark-gray'>First Name</p>
                    <input type="text" 
                    placeholder="" 
                    className="bg-primary-white border-none placeholder-dark-grey text-black text-subbody focus:outline-none p-[1rem] rounded-[4px]"
                    />
                </div>
                <div>
                    <p className='text-subbody text-dark-gray'>Last Name</p>
                    <input type="text" 
                    placeholder="" 
                    className="bg-primary-white border-none placeholder-dark-grey text-black text-subbody focus:outline-none p-[1rem] rounded-[4px]"
                    />
                </div>    
                <div>
                    <p className='text-subbody text-dark-gray'>Email</p>
                    <input type="text" 
                    placeholder="" 
                    className="bg-primary-white border-none placeholder-dark-grey text-black text-subbody focus:outline-none p-[1rem] rounded-[4px]"
                    />
                </div> 
                <div>
                    <p className='text-subbody text-dark-gray'>Password</p>
                    <input type="text" 
                    placeholder="" 
                    className="bg-primary-white border-none placeholder-dark-grey text-black text-subbody focus:outline-none p-[1rem] rounded-[4px]"
                    />
                </div>   
                <button type="submit" className="bg-primary-yellow text-black py-3 px-6 my-6 rounded hover:bg-secondary-yellow text-subbody">Update Profile</button>
            </form>                                 
        </div>
        <Outlet /> 
        </>
    )
}