import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { SHOWS } from '../../types/types'

const moviesQueryKeys = {
    all: ['shows'],
}

export const useGetShows = () => {
    const fetchShow = async (): Promise<SHOWS[]> => {
        const { data } = await axios.get(`/api/shows`)
        console.log(data)

        return data
    }
    return useQuery({
        queryKey: moviesQueryKeys.all,
        queryFn: fetchShow,
    })
}
