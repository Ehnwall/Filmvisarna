import { Outlet, useLocation } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import RenderMovies from './utils/api/movies/renderMovies'

const queryClient = new QueryClient()

export default function App() {
    // watch for route changes
    const { pathname } = useLocation()

    // scroll to top on route changes

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <main>
                    <RenderMovies />
                    <Outlet />
                </main>
            </QueryClientProvider>
        </>
    )
}
