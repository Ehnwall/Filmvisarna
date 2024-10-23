import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

const QUERY_KEY = ['bookings']

const fetchBookings = async (): Promise<any> => {
    const token = localStorage.getItem('token')

    try {
        const { data } = await axios.get('/api/bookings', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token || ''}`,
            },
        })
        console.log('Fetched data:', data)
        return data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 404) {
                console.warn('No bookings found for this user')
                return []
            }
            console.error('Axios error message:', error.message)
            console.error('Response data:', error.response?.data)
            throw new Error(`Could not fetch bookings: ${error.message}`)
        } else {
            console.error('Unexpected error:', error)
            throw new Error('An unexpected error occurred')
        }
    }
}

export const useGetBookings = () => {
    return useQuery({ queryKey: QUERY_KEY, queryFn: fetchBookings })
}
