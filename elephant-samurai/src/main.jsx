import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import router from './route'
import { RouterProvider } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { TicketCartProvider } from './contexts/CartContext'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <TicketCartProvider>
            <RouterProvider router={router} />
            <TanStackRouterDevtools router={router} />
        </TicketCartProvider>
    </StrictMode>
)
