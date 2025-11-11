import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import { useRouterState } from '@tanstack/react-router';


const Layout = ({ children }) => {

    // Get the current path using useRouterState for conditional footer rendering
    const {location} = useRouterState();
    const path = location.pathname;
    const hiddenFooter = path.startsWith('/show/');
    console.log('Current Page:', path);

    return (
        <div className='bg-primary-black text-primary-white'>
            <Header />
            <main>{children}</main>
            {!hiddenFooter && <Footer />}
        </div>
        
    )
}

export default Layout 
