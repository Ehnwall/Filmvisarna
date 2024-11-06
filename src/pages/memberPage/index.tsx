import { useAuth } from '../../context/authContext'
import Admin from '../../componets/member/admin/admin'
import CheckMember from '../../componets/member/member/checkMember'
const MemberPage = () => {
    const { user } = useAuth()

    return <>{user && user.role === 'admin' ? <Admin /> : <CheckMember />}</>
}

export default MemberPage
