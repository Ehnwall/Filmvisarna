import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

type SignIn = {
    email: string
    password: string
}
type SignInResponse = {
    bearer: string
    firstName: string
    lastName: string
}

const signIn = async (userInformation: SignIn): Promise<SignInResponse> => {
    const response = await axios.post<SignInResponse>('/api/login', userInformation)
    return response.data
}
export const useSignIn = () => {
    return useMutation<SignInResponse, Error, SignIn>({
        mutationFn: signIn,
        onSuccess: (data) => {
            sessionStorage.setItem('token', JSON.stringify({ token: data.bearer }))
            sessionStorage.setItem('user', JSON.stringify({ firstName: data.firstName, lastName: data.lastName }))
            setTimeout(() => {
                // tar bort alla tokens efter 1h
                sessionStorage.removeItem('token')
                sessionStorage.removeItem('user')
            }, 1000 * 60 * 60)
        },
        onError: (error) => {
            console.error('Error signing in', error)
        },
    })
}
