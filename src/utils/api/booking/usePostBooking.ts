import axios from 'axios'
import { BOOKING, BOOKINGRESP } from '../../types/types'
import { useMutation } from '@tanstack/react-query'

const QUERY_KEY = ['booking']

const postBooking = async (dataBooking: BOOKING) => {
    console.log(dataBooking)
    const resp = await axios.post<BOOKINGRESP>('/api/bookings', dataBooking)
    return resp.data
}

export const useMakebooking = () => {
    return useMutation<BOOKINGRESP, Error, BOOKING>({
        mutationFn: postBooking,
        onSuccess: (dataBooking) => {
            console.log(dataBooking)
        },
        onError: (error) => {
            console.log(error)
        },
    })
}
