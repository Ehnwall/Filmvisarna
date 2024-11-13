import axios, { AxiosError } from 'axios'
import { useMutation } from '@tanstack/react-query'
import { NEWMOVIE, POSTMOVIERESP, MOVIEERROR } from '@/utils/types/types'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const postMovie = async (newMovie: NEWMOVIE) => {
    const resp = await axios.post('/api/movies', newMovie)
    return resp.data
}

export const usePostMovie = () => {
    const navigate = useNavigate()
    return useMutation<POSTMOVIERESP, AxiosError<MOVIEERROR>, NEWMOVIE>({
        mutationFn: postMovie,
        onSuccess: (newMovie) => {
            navigate(`/admin/add-show`)
            setTimeout(() => {
                toast(`Filmen ${newMovie.movieTitle} lyckades läggas till i databasen`)
            }, 500)
        },
        onError: (error) => {
            console.error(error)
        },
    })
}
