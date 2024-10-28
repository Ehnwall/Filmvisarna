import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { USERBOOKING } from '@/utils/types/types'

const fetchBooking = async (bookingId: string): Promise<USERBOOKING> => {
    try {
        const { data } = await axios.get<USERBOOKING>(`/api/bookings/${bookingId}`)
        console.log('Booking data:', data)
        return data
    } catch (error) {
        console.error('Error fetching booking:', error)
        throw new Error('Could not fetch booking')
    }
}

export const useGetBooking = (bookingId: string) => {
    return useQuery({
        queryKey: ['booking', bookingId],
        queryFn: () => fetchBooking(bookingId),
    })
}
