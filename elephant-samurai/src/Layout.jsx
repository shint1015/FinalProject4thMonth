import { Link } from '@tanstack/react-router'

const Layout = ({ children }) => {
    return (
        <div>
            <header>
                Header
                <nav>
                    <Link to='/'>Home</Link> | <Link to='/test'>Test</Link>
                </nav>
            </header>
            <main className='bg-white'>{children}</main>
            <footer>Footer</footer>
        </div>
    )
}

export default Layout
