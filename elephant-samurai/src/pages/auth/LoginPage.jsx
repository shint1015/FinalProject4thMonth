import login_background from '@/assets/img/login_background.png'
import LoginForm from '@/components/auth/LoginForm.jsx'

export default function LoginPage() {
    return (
        <div className='flex bg-primary-black'>
            <img className='w-[50%] object-cover' src={login_background} alt='Login Background' />
            <div className='w-[50%] py-40'>
                <LoginForm />
            </div>
        </div>
    )
}
