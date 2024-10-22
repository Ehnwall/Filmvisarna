// pages/routes
import MemberPage from '../pages/memberPage/index'
import StartPage from '../pages/startPage/StartPage'
import SignIn from './api/auth/testAuth'

export default [
    { path: '/', element: <StartPage />, menuLabel: 'Hem' },
    { path: '/member', element: <MemberPage />, menuLabel: 'Medlem' },
    { path: '/sign-in', element: <SignIn />, menuLabel: 'Logga in' },
]

//Paths
// startpage url: `/`
// bookingpage url:´/boka-film/:showId`
// confirmationpage url:´/boknings-bekräftelse/:bookingId`
// member url:´/medlem`
// individual movie  url:´/film/:movieId`
// sign-in url:´/registera`
// sign-up url:´/logga-in`
// bookingpage url:´/boka-film/:showId`
