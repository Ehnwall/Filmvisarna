import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { MOVIE } from '../../types/types'

const moviesQueryKeys = {
    all: ['movies'],
}

export const useGetMovies = () => {
    const fetchMovies = async (): Promise<MOVIE[]> => {
        const { data } = await axios.get('/api/movies')

        console.log('Fetched movies data:', data)

        if (!Array.isArray(data)) {
            throw new Error('Invalid data format: expected an array')
        }

        return data
    }
    return useQuery({ queryKey: moviesQueryKeys.all, queryFn: fetchMovies })
}
