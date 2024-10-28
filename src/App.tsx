import { Outlet, useLocation } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Footer from './componets/footer/footer'
import { AuthProvider } from './context/authContext'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export default function App() {
    const queryClient = new QueryClient()
    // watch for route changes
    const { pathname } = useLocation()

    // scroll to top on route changes

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <div>header</div>
                    <main>
                        <Outlet />
                    </main>
                    <Footer />
                </AuthProvider>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </>
    )
}
