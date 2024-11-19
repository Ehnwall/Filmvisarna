import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { SHOWSONMOVIE } from '../../types/types'
import { useParams } from 'react-router-dom'

const showsOnMovieQueryKeys = ['Shows']

export const useGetShowsOnMovie = () => {
    const today = new Date()

    const { movieId } = useParams()

    const fetchShowsOnMovie = async (): Promise<SHOWSONMOVIE[]> => {
        const { data } = await axios.get(`/api/movies/${movieId}/shows?startDate=${today}&endDate=2025`)
        return data
    }

    return useQuery({
        queryKey: [showsOnMovieQueryKeys, movieId],
        queryFn: fetchShowsOnMovie,
    })
}
