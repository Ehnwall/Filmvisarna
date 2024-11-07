import React from 'react'
import { useEffect } from 'react'
import { useAuth } from '../../context/authContext'
import { useNavigate } from 'react-router-dom'

export default function Postshows() {
    const navigate = useNavigate()
    const { token } = useAuth()
    useEffect(() => {
        if (!token) {
            navigate('/logga-in')
        }
    }, [token, navigate])
    return <div>Postshows</div>
}
