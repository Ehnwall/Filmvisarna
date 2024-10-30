import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useParams } from 'react-router-dom'

type OCCUPIEDSEATS = {
    occupiedSeats: number[]
}
export const useGetOccupiedSeats = () => {
    const { showId } = useParams()
    const fetchSeats = async (): Promise<OCCUPIEDSEATS> => {
        const { data } = await axios.get(`/api/occupiedSeats/${showId}/`)
        return data
    }

    return useQuery({
        queryKey: ['OccupiedSeats', showId],
        queryFn: fetchSeats,
    })
}
