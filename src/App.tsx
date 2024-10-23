import { Outlet, useLocation } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from './context/authContext'

const queryClient = new QueryClient()
export default function App() {
    // watch for route changes
    const { pathname } = useLocation()

    // scroll to top on route changes

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <main>
                        <Outlet />
                    </main>
                </AuthProvider>
            </QueryClientProvider>
        </>
    )
}
