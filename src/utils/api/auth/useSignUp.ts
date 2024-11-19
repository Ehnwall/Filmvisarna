import { useMutation } from '@tanstack/react-query'
import { SIGNUP, SIGNUPRESPONSE } from '../../types/types'
import axios, { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const signIn = async (userInformation: SIGNUP): Promise<SIGNUPRESPONSE> => {
    const response = await axios.post<SIGNUPRESPONSE>('/api/signup', userInformation)
    return response.data
}
export const useSignUp = () => {
    const navigate = useNavigate()
    return useMutation<SIGNUPRESPONSE, AxiosError<{ msg: string }>, SIGNUP>({
        mutationFn: signIn,
        onSuccess: () => {
            navigate('/logga-in')
            setTimeout(() => {
                toast('Du är nu registrerad och kan logga in')
            }, 500)
        },
        onError: (error) => {
            console.error('Error signing in', error)
        },
    })
}
