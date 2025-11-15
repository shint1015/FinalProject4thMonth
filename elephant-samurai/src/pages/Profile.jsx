import { useState } from 'react';
import SubMenu from '@/components/common/subNav'
import { useAuth } from '@/hook/useAuth'
import checkMark from '@/assets/icon/CheckCircle_white.svg'
import { Link, useNavigate } from '@tanstack/react-router'

export default function Profile(){
    const [popUp, setPopUP] = useState(false);
    const { user, isLoading, isAuthenticated, updateProfile } = useAuth()
    const navigate = useNavigate()
    const [inputUser, setInputUser] = useState({ ...user });

    // for popup text
    const handleSubmit = (e) => {
        e.preventDefault();
        updateProfile(inputUser)
        localStorage.setItem("user",JSON.stringify(inputUser));
        setPopUP(true)
    };

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
            <h4 className="mt-8 text-primary-yellow text-h4 mb-6">Welcome back !</h4>
            <SubMenu/>
            {/* form */}
            <form className='mt-4' onSubmit={handleSubmit}>
                <div>
                    <p className='text-subbody text-dark-gray'>First Name</p>
                    <input type="text" 
                    value={inputUser.name || user.name}
                    onInput={(e) => setInputUser(prev => ({ ...prev, name: e.target.value }))}
                    className="bg-primary-white border-none placeholder-dark-grey text-black text-subbody focus:outline-none p-[1rem] rounded-[4px] w-full lg:w-1/3"
                    />
                </div>
                <div>
                    <p className='text-subbody text-dark-gray'>Last Name</p>
                    <input type="text" 
                    value={inputUser.lastName || user.lastName}
                    onInput={(e) => setInputUser(prev => ({ ...prev, lastName: e.target.value }))}
                    className="bg-primary-white border-none placeholder-dark-grey text-black text-subbody focus:outline-none p-[1rem] rounded-[4px] w-full lg:w-1/3"
                    />
                </div>    
                <div>
                    <p className='text-subbody text-dark-gray'>Email</p>
                    <input type="text" 
                    value={inputUser.email || user.email} 
                    onInput={(e) => setInputUser(prev => ({ ...prev, email: e.target.value }))}
                    className="bg-primary-white border-none placeholder-dark-grey text-black text-subbody focus:outline-none p-[1rem] rounded-[4px] w-full lg:w-1/3"
                    />
                </div> 
                <div>
                    <p className='text-subbody text-dark-gray'>Password</p>
                    <input type="text" 
                    value="••••••••" // should be not show
                    className="bg-primary-white border-none placeholder-dark-grey text-black text-subbody focus:outline-none p-[1rem] rounded-[4px] w-full lg:w-1/3 mb-6"
                    />
                </div>
              {/* pop up */}
              {popUp && (
                <div className='flex flex-row gap-2 mb-2'>
                  <img src={checkMark}/>
                  <p className="text-primary-white text-body">Your profile has been changed!</p>
                </div>
            )}                    
                <button type="submit" className="bg-primary-yellow text-black py-3 px-6 mb-8 rounded hover:bg-secondary-yellow text-subbody">Update Profile</button>
            </form>             
        </div>
        </>
    )
}