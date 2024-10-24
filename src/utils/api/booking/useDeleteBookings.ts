import axios from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const deleteBooking = async (bookingId: string): Promise<void> => {
    await axios.delete(`/api/bookings/${bookingId}`)
}
const DELETE_QUERY_KEY = ['bookings']

export const useDeleteBooking = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (bookingId: string) => deleteBooking(bookingId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: DELETE_QUERY_KEY })
        },
    })
}
