import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { CINEMASEATS } from '../../types/types'

const QUERY_KEY = ['Seats']

export const useGetSeats = () => {
    const fetchSeats = async () => {
        const resp = await axios.get(`/api/cinemas/1/seats`)
        return resp.data
    }
    return useQuery<CINEMASEATS, Error>({
        queryKey: QUERY_KEY,
        queryFn: fetchSeats,
    })
}
