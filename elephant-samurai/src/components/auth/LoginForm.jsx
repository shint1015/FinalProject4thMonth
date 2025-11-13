import { useState, useEffect } from 'react'
import { useAuth } from '@/hook/useAuth'
import { Link, useNavigate } from '@tanstack/react-router'

export default function LoginForm() {
    const [credentials, setCredentials] = useState({ email: '', password: '' })
    const { signIn, isLoading, error, resetError, isAuthenticated } = useAuth()
    const navigate = useNavigate()
    useEffect(() => {
        if (isAuthenticated) {
            navigate({ to: '/' })
        }
    }, [isAuthenticated, navigate])

    const handleSubmit = async e => {
        e.preventDefault()
        const result = await signIn(credentials)
        if (result.success) {
            // Redirect or show success message
            // TODO: toast notification
            console.log('Login successful!')
        }
    }

    const handleInputChange = e => {
        resetError() // Clear errors when user starts typing
        setCredentials(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    return (
        <>
            <h1 className='text-primary-yellow text-h1 text-center pb-3'>Log In</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-[70%] m-auto'>
                {error && <div className='error-message'>{error}</div>}
                <input
                    className='bg-primary-white text-primary-black py-4 px-2.5 rounded shadow-md focus:outline-none'
                    name='email'
                    type='email'
                    value={credentials.email}
                    onChange={handleInputChange}
                    placeholder='Email'
                    required
                />
                <input
                    className='bg-primary-white text-primary-black py-4 px-2.5 rounded shadow-md focus:outline-none'
                    name='password'
                    type='password'
                    value={credentials.password}
                    onChange={handleInputChange}
                    placeholder='Password'
                    required
                />
                <Link
                    to='/change-password'
                    className='font-extralight text-primary-white text-right leading-0'
                >
                    Forgot Password?
                </Link>
                <div className='mt-2 text-left font-extralight text-primary-white'>
                    Don’t have an account?{' '}
                    <Link to='/sign-up' className='font-extralight text-primary-white underline'>
                        Sign Up
                    </Link>
                </div>
                <button
                    className='p-2.5 rounded bg-primary-yellow text-primary-black hover:bg-secondary-yellow'
                    type='submit'
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <div className='flex gap-x-2 items-center justify-center'>
                            <div className='w-6 h-6 border-4 border-black border-t-transparent rounded-full animate-spin'></div>
                            Logging in...
                        </div>
                    ) : (
                        'Log In'
                    )}
                </button>
            </form>
        </>
    )
}
