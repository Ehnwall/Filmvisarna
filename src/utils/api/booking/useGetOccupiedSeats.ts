import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

type SSEData = {
    occupiedSeats: number[]
}

export const useGetOccupiedSeats = () => {
    const { showId } = useParams<{ showId: string }>()
    const [data, setData] = useState<SSEData | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const eventSource = new EventSource(`/api/occupiedSeats/${showId}`)

        eventSource.onmessage = (event) => {
            const parsedData = JSON.parse(event.data)
            setData(parsedData)
        }

        eventSource.onerror = (event) => {
            setError('Error occurred while receiving SSE data')
            eventSource.close()
        }

        return () => {
            eventSource.close()
        }
    }, [showId])

    return { data, error }
}
