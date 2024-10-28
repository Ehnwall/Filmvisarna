import { Outlet, useLocation } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Footer from './componets/footer/footer'
import Header from './componets/header'
import { AuthProvider } from './context/authContext'

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
                        <Outlet />
                    </main>
                    <Footer />
                </AuthProvider>
            </QueryClientProvider>
        </>
    )
}
