// pages/routes
import MemberPage from '../pages/MemberPage'
import StartPage from '../pages/StartPage'
import BookingPage from '../pages/BookingPage'
import IndividualMovie from '../pages/IndividualMovie'
import React from 'react'
import ConfirmationPage from '../pages/ConfirmationPage'
import ForgotPasswordMail from '../pages/ForgotPasswordMail'
import NewPasswordMail from '../pages/NewPasswordMail'
import SignIn from '../pages/SignIn'
import Register from '../pages/Register'

// paths to use with the router and with the main menu
export default [
  { path: '/', element: <StartPage />, menuLabel: 'Hem' },
  { path: '/BookingPage', element: <BookingPage /> },
  { path: '/ConfirmationPage', element: <ConfirmationPage /> },
  { path: '/ForgotPasswordMail', element: <ForgotPasswordMail /> },
  { path: '/NewPasswordMail', element: <NewPasswordMail /> },
  { path: '/Member', element: <MemberPage /> },
  { path: '/individual', element: <IndividualMovie /> },
  { path: '/Sign-In', element: <SignIn />, menuLabel: 'Medlem' },
  { path: '/Register', element: <Register /> },
]
