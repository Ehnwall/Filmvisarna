import { Outlet, useLocation } from 'react-router-dom'
import React from 'react'
import ConfirmationPage from './pages/ConfirmationPage'
import Footer from './pages/footer'

export default function App() {
  // watch for route changes
  const { pathname } = useLocation()

  // scroll to top on route changes

  return (
    <>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
