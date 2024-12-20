import axios, { AxiosError } from 'axios'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

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

const postShow = async (newShow: showType) => {
    const resp = await axios.post('/api/shows', newShow)
    return resp.data
}
export const usePostShow = () => {
    const navigate = useNavigate()
    return useMutation<showResp, AxiosError<showErrorMsg>, showType>({
        mutationFn: postShow,
        onSuccess: (newShow) => {
            navigate(`/admin`)
            setTimeout(() => {
                toast(`Visningen ${newShow.showId} lyckades läggas till i databasen`)
            }, 500)
        },
        onError: (error) => {
            console.error(error)
        },
    })
}
