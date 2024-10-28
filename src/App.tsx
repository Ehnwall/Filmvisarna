import { Outlet, useLocation } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Footer from './componets/footer/footer'
import Header from './componets/header'
import { AuthProvider } from './context/authContext'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import MoviesWithCinnema from './utils/api/shows/renderShows'

export default function App() {
    const queryClient = new QueryClient()
    // watch for route changes
    const { pathname } = useLocation()

    // scroll to top on route changes

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <Header />
                    <main>
                        <MoviesWithCinnema />
                        <Outlet />
                    </main>
                    <Footer />
                </AuthProvider>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </>
    )
}
