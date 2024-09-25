// pages/routes
import StartPage from '../pages/StartPage'
import IndividualMovie from '../pages/IndividualMovie'
import React from 'react'

// paths to use with the router and with the main menu
export default [
  { path: '/', element: <StartPage />, menuLabel: 'Start' },
  { path: '/individual', element: <IndividualMovie /> },
]
