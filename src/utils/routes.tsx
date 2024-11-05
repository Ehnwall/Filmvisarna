// pages/routes
import ContentFromFooter from '../componets/footer/footerInformation/ContentFromFooter'
import MemberPage from '../pages/memberPage/index'
import Login from '../pages/authLogIn'
import BookingPage from '../pages/booking/index'
import StartPage from '../pages/startPage/StartPage'
import IndividualMovie from '../pages/oneMoviePage'
import Register from '../pages/authSignUp'
import ConfirmationPage from '../pages/bookingConfirmation'

export default [
    { path: '/', element: <StartPage />, menuLabel: 'Hem' },
    { path: '/medlem', element: <MemberPage />, menuLabel: 'Medlemssida', title: 'Medlemssida' },
    { path: '/logga-in', element: <Login />, title: 'Logga in' },
    { path: '/registrera', element: <Register />, title: 'Registrera' },
    { path: '/film/:movieId', element: <IndividualMovie />, title: `Film` },
    { path: '/boka-film/:showId', element: <BookingPage />, title: 'Boka film' },
    { path: '/boknings-bekreftelse/:bookingId', element: <ConfirmationPage />, title: 'Bokningsinfo' },
    { path: '/innehall/:content', element: <ContentFromFooter /> },
]

//Paths
// startpage url: `/`
// bookingpage url:´/boka-film/:showId`
// confirmationpage url:´/boknings-bekräftelse/:bookingId`
// member url:´/medlem`
// individual movie  url:´/film/:movieId`
// sign-in url:´/registrera`
// sign-up url:´/logga-in`
// bookingpage url:´/boka-film/:showId`
