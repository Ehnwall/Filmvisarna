import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { USERBOOKING } from '@/utils/types/types'

const QUERY_KEY = ['bookings']

const fetchBookings = async (): Promise<USERBOOKING[]> => {
    const token = localStorage.getItem('token')

    try {
        const { data } = await axios.get<USERBOOKING[]>('/api/bookings', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token || ''}`,
            },
        })
        console.log('Fetched data:', data)
        return data
    } catch (error) {
        console.error('Error fetching bookings:', error)
        throw new Error('Could not fetch bookings')
    }
}

export const useGetBookings = () => {
    return useQuery({ queryKey: QUERY_KEY, queryFn: fetchBookings })
}
