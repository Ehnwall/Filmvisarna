import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useSignIn } from '../utils/api/auth/useSignIn'
import { UseMutationResult } from '@tanstack/react-query'
import { SIGNIN, SIGNINRESPONSE } from '../utils/types/types'
import axios from 'axios'

type AuthContextType = {
    user: { firstName: string; lastName: string } | null
    token: string | null
    signIn: UseMutationResult<SIGNINRESPONSE, Error, SIGNIN> | null
    signOut: () => void
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    token: null,
    signIn: null,
    signOut: () => {},
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<{ firstName: string; lastName: string } | null>(
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
            signOut: handleSignOut,
        }),
        [user, token, signIn]
    )

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext)
}
