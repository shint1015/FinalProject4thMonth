import { createContext, useContext, useState, useEffect } from 'react'
import mockAPI from '@/mock/authApi.js'

const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null)
    const [authStatus, setAuthStatus] = useState('loading')
    const [authError, setAuthError] = useState(null)

    useEffect(() => {
        const savedToken = localStorage.getItem('userToken')
        if (savedToken) {
            validateSession(savedToken)
        } else {
            setAuthStatus('unauthenticated')
        }
    }, [])

    const validateSession = async token => {
        try {
            const result = await mockAPI.validateToken(token)

            if (result.valid) {
                setCurrentUser(result.user)
                setAuthStatus('authenticated')
            } else {
                throw new Error('Invalid token')
            }
        } catch (error) {
            console.log('Session validation failed:', error.message)
            localStorage.removeItem('userToken')
            setAuthStatus('unauthenticated')
        }
    }

    const signIn = async credentials => {
        setAuthStatus('loading')
        setAuthError(null)
        try {
            const result = await mockAPI.login(credentials.email, credentials.password)
            setCurrentUser(result.user)
            setAuthStatus('authenticated')
            localStorage.setItem('userToken', result.token)

            return { success: true }
        } catch (error) {
            setAuthError(error.message)
            setAuthStatus('unauthenticated')
            return { success: false, message: error.message }
        }
    }

    const signOut = async () => {
        try {
            await mockAPI.logout()
        } catch (error) {
            console.log('Logout error:', error.message)
        } finally {
            setCurrentUser(null)
            setAuthStatus('unauthenticated')
            setAuthError(null)
            localStorage.removeItem('userToken')
            // TODO: toast notification
        }
    }

    const updateProfile = (user) => {
        setCurrentUser(user)
    }


    const resetError = () => setAuthError(null)

    const contextValue = {
        user: currentUser,
        isAuthenticated: authStatus === 'authenticated',
        isLoading: authStatus === 'loading',
        isAdmin: currentUser?.role === 'admin',
        error: authError,
        signIn,
        signOut,
        resetError,
        validateSession,
        updateProfile
    }

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within AuthProvider')
    }
    useEffect(() => {
        const token = localStorage.getItem('userToken')
        if (token && context.isAuthenticated) {
            // console.log('useAuth called - validating session...')
            context.validateSession(token)
        }
    }, [])
    return context
}
