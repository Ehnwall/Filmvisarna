// pages/routes
import MemberPage from '../pages/MemberPage'
import StartPage from '../pages/StartPage'
import IndividualMovie from '../pages/IndividualMovie'
import React from 'react'
import ConfirmationPage from '../pages/ConfirmationPage'
import ForgotPasswordMail from '../pages/ForgotPasswordMail'

// paths to use with the router and with the main menu
export default [
  { path: '/', element: <StartPage />, menuLabel: 'Start' },
  { path: '/ConfirmationPage', element: <ConfirmationPage />, menuLabel: 'ConfirmationPage' },
  { path: '/ForgotPasswordMail', element: <ForgotPasswordMail />, menuLabel: 'ForgotPasswordMail' },
  { path: '/Member', element: <MemberPage />, menuLabel: '' },
  { path: '/individual', element: <IndividualMovie /> },
]
