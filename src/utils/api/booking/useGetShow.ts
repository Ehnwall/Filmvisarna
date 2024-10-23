import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { SHOWS } from '../../types/types'
import { useParams } from 'react-router-dom'

const QUERY_KEY = ['shows']

export const useGetShow = () => {
    const { showId } = useParams()
    const fetchShows = async () => {
        const resp = await axios.get(`/api/shows/${showId}`)
        return resp.data[0]
    }
    return useQuery<SHOWS, Error>({
        queryKey: QUERY_KEY,
        queryFn: fetchShows,
    })
}
