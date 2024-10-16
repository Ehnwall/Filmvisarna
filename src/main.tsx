// main imports
import React from 'react'
import ReactDOM from 'react-dom/client'
import '../sass/main.scss'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import routes from './utils/routes'
import App from './App'

// set a title

// create a router
const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: routes,
    },
])

// create the React root element
ReactDOM.createRoot(document.querySelector('#root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)
