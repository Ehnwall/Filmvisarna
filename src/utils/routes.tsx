// pages/routes
import StartPage from '../pages/startPage/StartPage'
import IndividualMovie from '../pages/oneMoviePage'

export default [
    { path: '/', element: <StartPage />, menuLabel: 'Hem' },
    { path: '/film/:movieId', element: <IndividualMovie /> },
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
