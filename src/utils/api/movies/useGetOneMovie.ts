import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { MOVIE } from '../../types/types'
import { useParams } from 'react-router-dom'

const movieQueryKeys = {
    all: ['movie'],
    byId: (id: string) => [...movieQueryKeys.all, id],
}

export const useGetOneMovie = () => {
    const { movieId } = useParams()
    const fetchOneMovie = async (): Promise<MOVIE> => {
        const { data } = await axios.get(`/api/movies/${movieId}`)
        return data
    }

    return useQuery({
        queryKey: [movieQueryKeys.byId, movieId],
        queryFn: fetchOneMovie,
    })
}
