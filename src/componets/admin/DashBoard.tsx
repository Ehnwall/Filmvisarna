import React from 'react'
import { Card, Button, Row } from 'react-bootstrap'
import { BiSolidCameraMovie, BiSlideshow } from 'react-icons/bi'
import { MdDelete } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import AdminShows from './AdminShows'

export default function DashBoard() {
    return (
        <>
            <Row>
                <h2 className="text-center">Välkommen Admin!</h2>
                <AdminShows />
            </Row>
        </>
    )
}
