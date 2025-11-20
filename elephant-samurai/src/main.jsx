import { createRoot } from 'react-dom/client'
import './index.css'
import { AuthProvider } from '@/hook/useAuth'
import InnerApp from '@/components/layout/InnerApp'

createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <InnerApp />
    </AuthProvider>
)
