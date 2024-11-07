// pages/routes
import ContentFromFooter from '../componets/footer/footerInformation/ContentFromFooter'
import MemberPage from '../pages/memberPage/index'
import Login from '../pages/authLogIn'
import BookingPage from '../pages/booking/index'
import StartPage from '../pages/startPage/StartPage'
import IndividualMovie from '../pages/oneMoviePage'
import Register from '../pages/authSignUp'
import ConfirmationPage from '../pages/bookingConfirmation'
import PostMovies from '../componets/admin/postMovies'
import ProtectedRoute from '../componets/ProtectedRoute'
import Admin from '../componets/admin/admin'

export default [
    { path: '/', element: <StartPage />, menuLabel: 'Hem' },
    { path: '/medlem', element: <MemberPage />, menuLabel: 'Medlemssida' },
    { path: '/innehall/:content', element: <ContentFromFooter /> },
    { path: '/logga-in', element: <Login /> },
    { path: '/registrera', element: <Register /> },
    { path: '/film/:movieId', element: <IndividualMovie /> },
    { path: '/boka-film/:showId', element: <BookingPage /> },
    { path: '/boknings-bekräftelse/:bookingId', element: <ConfirmationPage /> },
    {
        element: <ProtectedRoute role="admin" />,
        children: [
            {
                path: '/admin',
                element: <Admin />,
            },
            {
                path: '/admin/add-movie',
                element: <PostMovies />,
            },
        ],
    },
    {
        element: <ProtectedRoute role="user" />,
        children: [
            {
                path: '/medlem',
                element: <MemberPage />,
            },
        ],
    },
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
