import { Outlet, useLocation } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Footer from './componets/footer/footer'
import Header from './componets/header/header'
import { AuthProvider } from './context/authContext'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import routes from './utils/routes'
import { useEffect } from 'react'

const queryClient = new QueryClient()
export default function App() {
    document.title = 'Filmvisarna'
    const { pathname } = useLocation()
    // watch for route changes
    useEffect(() => {
        const page = routes.find((route) => route.path?.split('/')[1] === pathname.split('/')[1])
        if (page?.title) {
            document.title = `${page.title} | Filmvisarna`
        }
    }, [pathname])

    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <Header />
                <main>
                    <Outlet />
                </main>
                <Footer />
            </AuthProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}
