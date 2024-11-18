import { Row } from 'react-bootstrap'
import AdminShows from './AdminShows'
import { ToastContainer } from 'react-toastify'
import { useAuth } from '../../context/authContext'

export default function DashBoard() {
    const { user } = useAuth()

    return (
        <>
            <Row>
                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />
                {/* <h2 className="text-center">Välkommen {user?.firstName}</h2> */}
                <AdminShows />
            </Row>
        </>
    )
}
