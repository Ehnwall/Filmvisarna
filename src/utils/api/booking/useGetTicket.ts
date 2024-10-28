import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { TICKETS } from '../../types/types'

const QUERY_KEY = ['tickets']

export const useGetTickets = () => {
    const fetchTickets = async () => {
        const resp = await axios.get(`/api/tickets`)
        console.log(resp)
        return resp.data
    }
    return useQuery<TICKETS[], Error>({
        queryKey: QUERY_KEY,
        queryFn: fetchTickets,
    })
}
