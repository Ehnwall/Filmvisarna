import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { USERBOOKING } from '@/utils/types/types'

const fetchBooking = async (identifier: string): Promise<USERBOOKING[]> => {
    const trimmed = identifier.trim()
    try {
        const isEmail = trimmed.includes('@')
        const { data } = await axios.get<USERBOOKING[]>(
            isEmail ? `/api/bookings/email/${trimmed}` : `/api/bookings/${trimmed}`
        )
        return data
    } catch (error) {
        console.error('Error fetching booking:', error)
        throw new Error('Could not fetch booking')
    }
}

export const useGetBooking = (identifier: string) => {
    return useQuery({
        queryKey: ['booking', identifier],
        queryFn: () => fetchBooking(identifier),
        enabled: !!identifier,
    })
}
