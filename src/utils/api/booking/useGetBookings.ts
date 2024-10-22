import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

const QUERY_KEY = ['bookings']

const fetchBookings = async (): Promise<any> => {
    const token = localStorage.getItem('token')
    const { data } = await axios.get('/api/bookings', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token || ''}`,
        },
    })
    console.log('Fetched data:', data)
    return data
}

export const useGetBookings = () => {
    return useQuery({ queryKey: QUERY_KEY, queryFn: fetchBookings })
}
