import { useState, useEffect } from 'react';
import SubMenu from '../components/common/subNav'
import mockAPI from '../mock/authApi'
import checkMark from '../assets/icon/CheckCircle_Black.svg'

export default function Profile(){
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [popUp, setPopUP] = useState(false);

    useEffect(() => {
    const token = localStorage.getItem("token"); 
    if (!token) {
      setLoading(false);
      return;
    }
    mockAPI.validateToken(token).then(res => {
      if (res.valid) {
        setProfile(res.user); 
      }
      setLoading(false);
    });
    }, []);
    if (loading) return <p className="text-body text-primary-white">Loading...</p>;
    if (!profile)
        return <p className="text-body text-primary-white">No user logged in.</p>;
    
    // for button & popup
    const handleSubmit = (e) => {
        e.preventDefault();
        setPopUP(true);
        setTimeout(()=>{
            setPopUP(false)
        }, 3000)
    };
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
                    value={profile.name}
                    onInput={(e) => setProfile({ ...profile, displayName: e.target.value })}
                    className="bg-primary-white border-none placeholder-dark-grey text-black text-subbody focus:outline-none p-[1rem] rounded-[4px] w-full lg:w-1/3"
                    />
                </div>
                <div>
                    <p className='text-subbody text-dark-gray'>Last Name</p>
                    <input type="text" 
                    value={profile.lastName}
                    onInput={(e) => setProfile({ ...profile, lastName: e.target.value })}
                    className="bg-primary-white border-none placeholder-dark-grey text-black text-subbody focus:outline-none p-[1rem] rounded-[4px] w-full lg:w-1/3"
                    />
                </div>    
                <div>
                    <p className='text-subbody text-dark-gray'>Email</p>
                    <input type="text" 
                    value={profile.email} 
                    onInput={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="bg-primary-white border-none placeholder-dark-grey text-black text-subbody focus:outline-none p-[1rem] rounded-[4px] w-full lg:w-1/3"
                    />
                </div> 
                <div>
                    <p className='text-subbody text-dark-gray'>Password</p>
                    <input type="text" 
                    placeholder="••••••••" // should be not show
                    className="bg-primary-white border-none placeholder-dark-grey text-black text-subbody focus:outline-none p-[1rem] rounded-[4px] w-full lg:w-1/3"
                    />
                </div>   
                <button type="submit" className="bg-primary-yellow text-black py-3 px-6 my-6 rounded hover:bg-secondary-yellow text-subbody">Update Profile</button>
            </form>     
        </div>
        {/* pop up */}
        {popUp && (
        <div className="flex items-center justify-center">
          <div className="bg-primary-white">
            <img src={checkMark}/>
            <p className="text-primary-black">Your profile has been changed!</p>
          </div>
        </div>
      )}
        </>
    )
}