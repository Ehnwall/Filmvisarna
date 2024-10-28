import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { SHOWSONMOVIE } from '../../types/types'
import { useParams } from 'react-router-dom'

const showsOnMovieQueryKeys = ['Shows']

export const useGetShowsOnMovie = () => {
    const today = new Date()
    const day = ('0' + today.getDate()).slice(-2)
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const year = today.getFullYear()

    const startDate = `${year}-${month}-${day}`

    const { movieId } = useParams()

    const fetchShowsOnMovie = async (): Promise<SHOWSONMOVIE[]> => {
        const { data } = await axios.get(`/api/movies/${movieId}/shows?startDate=${startDate}&endDate=2025`)
        return data
    }

    return useQuery({
        queryKey: [showsOnMovieQueryKeys, movieId],
        queryFn: fetchShowsOnMovie,
    })
}
