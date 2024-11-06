import { useMutation } from '@tanstack/react-query'
import { SIGNIN, SIGNINRESPONSE } from '../../types/types'
import axios from 'axios'

const signIn = async (userInformation: SIGNIN): Promise<SIGNINRESPONSE> => {
    const response = await axios.post<SIGNINRESPONSE>('/api/login', userInformation)
    return response.data
}
export const useSignIn = () => {
    return useMutation<SIGNINRESPONSE, Error, SIGNIN>({
        mutationFn: signIn,
        onSuccess: (data) => {
            sessionStorage.setItem('token', JSON.stringify({ token: data.bearer }))
            sessionStorage.setItem(
                'user',
                JSON.stringify({ firstName: data.firstName, lastName: data.lastName, role: data.role })
            )
            setTimeout(() => {
                // tar bort alla tokens efter 1h
                sessionStorage.removeItem('token')
                sessionStorage.removeItem('user')
            }, 1000 * 60 * 60)
            window.location.replace('/medlem')
        },
        onError: (error) => {
            console.error('Error signing in', error)
        },
    })
}
