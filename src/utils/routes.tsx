// pages/routes
import BookingPage from '../pages/booking/index'
import StartPage from '../pages/startPage/StartPage'

export default [
    { path: '/', element: <StartPage />, menuLabel: 'Hem' },
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
