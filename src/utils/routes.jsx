// pages/routes
import StartPage from '../pages/StartPage'
import BookingPage from '../pages/BookingPage'
import React from 'react'

// paths to use with the router and with the main menu
export default [
  { path: '/', element: <StartPage />, menuLabel: 'Start' },
  { path: '/BookingPage', element: <BookingPage /> },
]
