import { useAuth } from '../context/authContext'
import { Navigate, Outlet } from 'react-router-dom'
import AdminLayout from './member/admin/AdminLayout'
type Roles = 'admin' | 'user'
export default function ProtectedRoute({ role }: { role: Roles }) {
    const { token, user } = useAuth()
    if ((role && user && user.role !== role) || !token) {
        return <Navigate to="/" />
    }
    if (role === 'admin') {
        return (
            <AdminLayout>
                <Outlet />
            </AdminLayout>
        )
    }
    return <Outlet />
}
