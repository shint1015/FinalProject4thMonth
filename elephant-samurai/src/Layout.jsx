import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'


const Layout = ({ children }) => {

    return (
        <div className='bg-primary-black text-primary-white'>
            <Header />
            <main>{children}</main>
            <Footer />
        </div>

    )
}

export default Layout 
