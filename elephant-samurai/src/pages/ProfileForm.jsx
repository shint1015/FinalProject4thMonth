import { useState } from 'react';
import { useAuth } from '@/hook/useAuth'
import checkMark from '@/assets/icon/CheckCircle_white.svg'

export default function Profile() {
    const [popUp, setPopUP] = useState(false);
    const { user, updateProfile } = useAuth()
    const [inputUser, setInputUser] = useState({ ...user });

    // for popup text
    const handleSubmit = (e) => {
        e.preventDefault();
        updateProfile(inputUser)
        localStorage.setItem("user", JSON.stringify(inputUser));
        setPopUP(true)
    };

    return (
        <>
            <div className='px-[2rem] sm:px-[3rem] lg:px-[5rem]'>
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
                        <input type="email"
                            value={inputUser.email || user.email}
                            onInput={(e) => setInputUser(prev => ({ ...prev, email: e.target.value }))}
                            className="bg-primary-white border-none placeholder-dark-grey text-black text-subbody focus:outline-none p-[1rem] rounded-[4px] w-full lg:w-1/3"
                        />
                    </div>
                    <div>
                        <p className='text-subbody text-dark-gray'>Password</p>
                        <input type="password"
                            value="••••••••" // should be not show
                            className="bg-primary-white border-none placeholder-dark-grey text-black text-subbody focus:outline-none p-[1rem] rounded-[4px] w-full lg:w-1/3 mb-6"
                        />
                    </div>
                    {/* pop up */}
                    {popUp && (
                        <div className='flex flex-row gap-2 mb-2'>
                            <img src={checkMark} />
                            <p className="text-primary-white text-body">Your profile has been changed!</p>
                        </div>
                    )}
                    <button type="submit" className="bg-primary-yellow text-black py-3 px-6 mb-8 rounded hover:bg-secondary-yellow text-subbody">Update Profile</button>
                </form>
            </div>
        </>
    )
}