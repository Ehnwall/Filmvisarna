import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { SHOWS } from '../../types/types'

const moviesQueryKeys = {
    all: ['shows'],
}

export const useGetShows = () => {
    const today = new Date()

    const fetchShows = async (): Promise<SHOWS[]> => {
        const { data } = await axios.get(`/api/shows?startDate=${today}&endDate=2025`)
        return data
    }

    return useQuery({
        queryKey: moviesQueryKeys.all,
        queryFn: fetchShows,
    })
}
