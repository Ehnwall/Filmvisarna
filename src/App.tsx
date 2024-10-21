import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

export default function App() {
    // watch for route changes
    const { pathname } = useLocation()

    // scroll to top on route changes

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <main>
                    <Outlet />
                </main>
            </QueryClientProvider>
        </>
    )
}
