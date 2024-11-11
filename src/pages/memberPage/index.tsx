import { useAuth } from '../../context/authContext'
import CheckMember from '../../componets/member/member/checkMember'
import { Navigate } from 'react-router-dom'
const MemberPage = () => {
    const { user } = useAuth()
    if (user && user.role === 'admin') {
        return <Navigate to="/admin" />
    }
    return <CheckMember />
}

export default MemberPage
