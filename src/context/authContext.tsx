import { createContext, useContext, useMemo, useState, useEffect } from 'react'
import { useSignIn } from '../utils/api/auth/useSignIn'
import { UseMutationResult } from '@tanstack/react-query'
import { SIGNIN, SIGNINRESPONSE, SIGNUP, SIGNUPRESPONSE } from '../utils/types/types'
import { useSignUp } from '../utils/api/auth/useSignUp'
import axios, { AxiosError } from 'axios'
type ErrorTest = {
    msg: string
}

type AuthContextType = {
    user: { firstName: string; lastName: string; role: string } | null
    token: string | null
    signIn: UseMutationResult<SIGNINRESPONSE, Error, SIGNIN> | null
    signUp: UseMutationResult<SIGNUPRESPONSE, AxiosError<ErrorTest>, SIGNUP> | null
    signOut: () => void
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    token: null,
    signIn: null,
    signUp: null,
    signOut: () => {},
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<{ firstName: string; lastName: string; role: string } | null>(
        sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user') as string) : null
    )
    const [token, setToken] = useState<string | null>(
        sessionStorage.getItem('token') ? JSON.parse(sessionStorage.getItem('token') as string).token : null
    )
    const signIn = useSignIn()

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
        } else {
            delete axios.defaults.headers.common['Authorization']
        }
    }, [])
    const signUp = useSignUp()

    const handleSignOut = () => {
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('user')
        setToken(null)
        setUser(null)
    }

    const contextValue = useMemo(
        () => ({
            user,
            token,
            signIn,
            signUp,
            signOut: handleSignOut,
        }),
        [user, token, signIn]
    )

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext)
}
