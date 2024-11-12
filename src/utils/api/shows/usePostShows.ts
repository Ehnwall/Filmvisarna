import axios, { AxiosError } from 'axios'
import { useMutation } from '@tanstack/react-query'
import { SHOWS } from '@/utils/types/types'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const postShow = async (newShow: showType) => {
    console.log(newShow)
    const resp = await axios.post('/api/shows', newShow)
    return resp.data
}
type showResp = {
    sucess: boolean
    showId: number
}
type showErrorMsg = {
    msg: string
}
type showType = {
    movieId: number
    time: string
    cinemaId: number
}
export const usePostShow = () => {
    const navigate = useNavigate()
    return useMutation<showResp, AxiosError<showErrorMsg>, showType>({
        mutationFn: postShow,
        onSuccess: (newShow) => {
            console.log(newShow)
            navigate(`/admin`)
            setTimeout(() => {
                toast(`Visningen ${newShow.showId} lyckades läggas till i databasen`)
            }, 500)
        },
        onError: (error) => {
            console.log(error)
        },
    })
}
// export const usePostMovie = () => {
//     const navigate = useNavigate()
//     return useMutation<showResp, AxiosError<showErrorMSG>, NEWMOVIE>({
//         mutationFn: postMovie,
//         onSuccess: (newMovie) => {
//             navigate(`/admin/add-show`)
//             setTimeout(() => {
//                 toast(`Filmen ${newMovie.movieTitle} lyckades läggas till i databasen`)
//             }, 500)
//         },
//         onError: (error) => {
//             console.log(error)
//         },
//     })
// }
