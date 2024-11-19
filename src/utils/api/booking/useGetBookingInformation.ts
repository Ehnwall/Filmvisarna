import { CINEMASEATS, SHOWS, TICKETS } from '@/utils/types/types'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const fetchShows = async (showId: string) => {
    const { data } = await axios.get<SHOWS[]>(`/api/shows/${showId}`)
    return data[0]
}
const fetchSeats = async (cinemaId: number) => {
    const { data } = await axios.get<CINEMASEATS[]>(`/api/cinemas/${cinemaId}/seats`)
    return data
}
const fetchTickets = async () => {
    const { data } = await axios.get<TICKETS[]>(`/api/tickets`)
    return data
}

export const useGetBookingInformation = () => {
    const { showId } = useParams<{ showId: string }>()
    if (!showId) {
        throw new Error('showId is undefined')
    }
    const showsQuery = useQuery({ queryKey: ['shows', showId], queryFn: () => fetchShows(showId) })

    const cinemaId = showsQuery.data && (showsQuery.data?.cinemaId as number)

    const seatsQuery = useQuery({
        queryKey: ['seats', showId],
        queryFn: () => fetchSeats(cinemaId as number),
        enabled: !!cinemaId,
    })
    const ticketsQuery = useQuery({ queryKey: ['tickets'], queryFn: fetchTickets })

    return { showsQuery, seatsQuery, ticketsQuery }
}
