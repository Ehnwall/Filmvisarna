import axios, { AxiosError } from 'axios'
import { BOOKING, BOOKINGRESP, PARTIALBOOKING } from '../../types/types'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

type BookingError = {
    msg: string
}

const postBooking = async (dataBooking: PARTIALBOOKING) => {
    const resp = await axios.post<BOOKINGRESP>('/api/bookings', dataBooking)
    return resp.data
}

export const useMakebooking = () => {
    const navigate = useNavigate()
    return useMutation<BOOKINGRESP, AxiosError<BookingError>, PARTIALBOOKING>({
        mutationFn: postBooking,
        onSuccess: (dataBooking) => {
            navigate(`/boknings-bekräftelse/${dataBooking.bookingNr}`)
        },
        onError: (error) => {
            console.log(error)
        },
    })
}
