import { useMutation } from '@tanstack/react-query'
import { SIGNUP, SIGNUPRESPONSE } from '../../types/types'
import axios from 'axios'

const signIn = async (userInformation: SIGNUP): Promise<SIGNUPRESPONSE> => {
    const response = await axios.post<SIGNUPRESPONSE>('/api/signup', userInformation)
    return response.data
}
export const useSignUp = () => {
    return useMutation<SIGNUPRESPONSE, Error, SIGNUP>({
        mutationFn: signIn,
        onSuccess: (data) => {
            console.log('Success signing in', data)
        },
        onError: (error) => {
            console.error('Error signing in', error)
        },
    })
}
