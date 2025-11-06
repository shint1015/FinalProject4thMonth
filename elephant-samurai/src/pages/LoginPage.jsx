import login_background from '@/assets/img/login_background.svg'
import LoginForm from '@/components/auth/LoginForm.jsx'

export default function LoginPage() {
    return (
        <div class='flex'>
            <img src={login_background} alt='Login Background' />
            <LoginForm />
        </div>
    )
}
