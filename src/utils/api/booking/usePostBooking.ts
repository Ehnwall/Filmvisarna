import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { BOOKING } from '../../types/types'
import { useMutation } from '@tanstack/react-query'

const QUERY_KEY = ['booking']

export const postBooking = async (data: BOOKING) => {
    console.log(data)
    const resp = await axios.post(`/api/bookings`, data)
    return resp.data
}
export const createBooking = () => {}
