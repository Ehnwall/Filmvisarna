import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { USERBOOKING } from '@/utils/types/types'

const QUERY_KEY = ['bookings']

const fetchBookings = async (): Promise<USERBOOKING[]> => {
    try {
        const { data } = await axios.get<USERBOOKING[]>('/api/bookings')
        return data
    } catch (error) {
        console.error('Error fetching bookings:', error)
        throw new Error('Could not fetch bookings')
    }
}

export const useGetBookings = () => {
    return useQuery({ queryKey: QUERY_KEY, queryFn: fetchBookings })
}
