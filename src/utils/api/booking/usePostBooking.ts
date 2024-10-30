import axios from 'axios'
import { BOOKING, BOOKINGRESP, PARTIALBOOKING } from '../../types/types'
import { useMutation } from '@tanstack/react-query'

const postBooking = async (dataBooking: PARTIALBOOKING) => {
    console.log(dataBooking)
    const resp = await axios.post<BOOKINGRESP>('/api/bookings', dataBooking)
    return resp.data
}

export const useMakebooking = () => {
    return useMutation<BOOKINGRESP, Error, PARTIALBOOKING>({
        mutationFn: postBooking,
        onSuccess: (dataBooking) => {
            console.log(dataBooking)
        },
        onError: (error) => {
            console.log(error)
        },
    })
}
