import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { CINEMASEATS } from '../../types/types'

const SeatsQueryKeys = ['Seats']

export const useGetSeats = (cinemaId: number) => {
    const fetchSeats = async (): Promise<CINEMASEATS[]> => {
        const resp = await axios.get(`/api/cinemas/${cinemaId}/seats`)
        return resp.data
    }

    return useQuery({
        queryKey: SeatsQueryKeys,
        queryFn: fetchSeats,
    })
}
