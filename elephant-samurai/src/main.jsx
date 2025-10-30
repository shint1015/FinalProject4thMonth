import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
import router from './route'
import { RouterProvider } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router} />
        <TanStackRouterDevtools router={router} />
    </StrictMode>
)
