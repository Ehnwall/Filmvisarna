import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useSignIn } from '../utils/api/auth/useSignIn'
import { UseMutationResult } from '@tanstack/react-query'
import { SIGNIN, SIGNINRESPONSE } from '../utils/types/types'
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
    const [user, setUser] = useState<{ firstName: string; lastName: string } | null>(null)
    const [token, setToken] = useState<string | null>(null)
    const signIn = useSignIn()

    useEffect(() => {
        const storedToken = sessionStorage.getItem('token')
        const storedUser = sessionStorage.getItem('user')
        if (storedToken && storedUser) {
            setToken(JSON.parse(storedToken).token)
            setUser(JSON.parse(storedUser))
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
