import { OCCUPIEDSEATS } from '@/utils/types/types'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useInfiniteQuery } from '@tanstack/react-query'

export const useGetOccupiedSeats = () => {
    const { showId } = useParams<{ showId: string }>()

    const fetchOccupiedSeats = async () => {
        const { data } = await axios.get<OCCUPIEDSEATS>(`/api/occupiedSeats/${showId}/`)
        return data
    }
    const occupiedSeatsQuery = useInfiniteQuery({
        queryKey: ['occupiedSeats', showId],
        queryFn: () => fetchOccupiedSeats(),
    })
    return occupiedSeatsQuery
}
