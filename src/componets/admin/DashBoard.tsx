import React from 'react'
import { Card, Button, Row } from 'react-bootstrap'
import { BiSolidCameraMovie, BiSlideshow } from 'react-icons/bi'
import { MdDelete } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import AdminShows from './AdminShows'
import { ToastContainer } from 'react-toastify'

export default function DashBoard() {
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
                <h2 className="text-center">Välkommen Admin!</h2>
                <AdminShows />
            </Row>
        </>
    )
}
