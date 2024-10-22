import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export default function App() {
    const queryClient = new QueryClient()
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
