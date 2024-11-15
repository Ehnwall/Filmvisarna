// main imports
import React from 'react'
import ReactDOM from 'react-dom/client'
import 'react-toastify/dist/ReactToastify.css'
import '../sass/main.scss'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import routes from './utils/routes'
import App from './App'


// create a router
const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: routes,
    },
])

ReactDOM.createRoot(document.querySelector('#root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)
