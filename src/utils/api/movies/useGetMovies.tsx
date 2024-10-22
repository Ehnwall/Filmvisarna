import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { MOVIE } from '../../types/types'

const moviesQueryKeys = {
    all: ['movies'],
}

export const useGetMovies = () => {
    const fetchMovies = async (): Promise<MOVIE[]> => {
        const { data } = await axios.get('/api/movies')
        return data
    }
    return useQuery({ queryKey: moviesQueryKeys.all, queryFn: fetchMovies })
}
