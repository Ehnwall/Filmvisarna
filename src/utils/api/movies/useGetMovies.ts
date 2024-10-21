import { useQuery } from 'react-query'
import axios from 'axios'
import { MOVIE } from '../../types/Types'

const QUERY_KEY = ['movies']

const fetchMovie = async (): Promise<MOVIE> => {
    const { data } = await axios.get(`/api/movies`)
    console.log(data)
    return data
}

export const useGetMovies = () => {
    return useQuery<MOVIE, Error>(QUERY_KEY, () => fetchMovie())
}
