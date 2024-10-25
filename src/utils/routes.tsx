// pages/routes
import ContentFromFooter from '../componets/footer/footerInformation/ContentFromFooter'
import MemberPage from '../pages/memberPage/index'
import Login from '../pages/authLogIn'
import BookingPage from '../pages/booking/index'
import StartPage from '../pages/startPage/StartPage'
import IndividualMovie from '../pages/oneMoviePage'

export default [
    { path: '/', element: <StartPage />, menuLabel: 'Hem' },
    { path: '/medlem', element: <MemberPage />, menuLabel: 'Medlem' },
    { path: '/innehall/:content', element: <ContentFromFooter /> },
    { path: '/logga-in', element: <Login /> },
    { path: '/film/:movieId', element: <IndividualMovie /> },
    { path: '/boka-film/:showId', element: <BookingPage />, menuLabel: 'Boka' },
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
