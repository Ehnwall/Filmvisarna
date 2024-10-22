import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { SHOWSONMOVIE } from '../../types/types'
import { useParams } from 'react-router-dom'
import { parse } from 'dotenv'

const showsOnMovieQueryKeys = {
    all: ['Shows'],
    byId: (id: string) => [...showsOnMovieQueryKeys.all, id],
}

export const useGetShowsOnMovie = () => {
    const { movieId } = useParams()
    console.log(movieId)
    const fetchShowsOnMovie = async (): Promise<SHOWSONMOVIE> => {
        const { data } = await axios.get(`/api/movies/${movieId}/shows`)
        console.log(JSON.parse(data))
        return data
    }

    return useQuery({
        queryKey: [showsOnMovieQueryKeys.byId, movieId],
        queryFn: fetchShowsOnMovie,
    })
}
