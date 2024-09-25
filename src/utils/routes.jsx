// pages/routes
import MemberPage from '../pages/MemberPage'
import StartPage from '../pages/StartPage'
import IndividualMovie from '../pages/IndividualMovie'
import React from 'react'
import ConfirmationPage from '../pages/ConfirmationPage'
import SignIn from '../pages/SignIn'
import Register from '../pages/Register'

// paths to use with the router and with the main menu
export default [
  { path: '/', element: <StartPage />, menuLabel: 'Start' },
  { path: '/ConfirmationPage', element: <ConfirmationPage />, menuLabel: 'ConfirmationPage' },
  { path: '/Member', element: <MemberPage />, menuLabel: '' },
  { path: '/individual', element: <IndividualMovie /> },
  { path: '/Sign-In', element: <SignIn /> },
  { path: '/Register', element: <Register /> },
]
