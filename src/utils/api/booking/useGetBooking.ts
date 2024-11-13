import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { USERBOOKING } from '@/utils/types/types'

const fetchBooking = async (bookingNr: string): Promise<USERBOOKING> => {
    try {
        const { data } = await axios.get<USERBOOKING>(`/api/bookings/${bookingNr}`)
        return data
    } catch (error) {
        console.error('Error fetching booking:', error)
        throw new Error('Could not fetch booking')
    }
}

export const useGetBooking = (bookingNr: string) => {
    return useQuery({
        queryKey: ['booking', bookingNr],
        queryFn: () => fetchBooking(bookingNr),
        enabled: !!bookingNr,
    })
}
