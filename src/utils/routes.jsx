// pages/routes
import MemberPage from '../pages/MemberPage'
import StartPage from '../pages/StartPage'
import IndividualMovie from '../pages/IndividualMovie'
import React from 'react'
import ConfirmationPage from '../pages/ConfirmationPage'

// paths to use with the router and with the main menu
export default [
  { path: '/', element: <StartPage />, menuLabel: 'Hem' },
  { path: '/ConfirmationPage', element: <ConfirmationPage /> },
  { path: '/Member', element: <MemberPage /> },
  { path: '/individual', element: <IndividualMovie /> },
]
