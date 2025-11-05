import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import logo from '@/assets/img/Logo.svg'
import hamburgerMenuIcon from '@/assets/icon/HamburgerMenu.svg'
export default function Header() {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(undefined)
    const toggleMobileMenu = () => {
        setMobileMenuOpen(prev => !prev)
    }

    return (
        <header className='flex items-center justify-between py-2 px-4 font-extralight'>
            <div className='flex items-center justify-between w-[60%] gap-8'>
                <div className='logo-container'>
                    <img src={logo} alt='Elephant Samurai Logo' className='h-7 sm:h-14' />
                </div>
                <nav className='sm:block hidden w-[80%]'>
                    <ul className='flex space-x-8'>
                        <li>
                            <Link to='/' className='text-primary-white hover:text-primary-gray'>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to='/show' className='text-primary-white hover:text-primary-gray'>
                                Show
                            </Link>
                        </li>
                        <li>
                            <Link
                                to='/about'
                                className='text-primary-white hover:text-primary-gray'
                            >
                                About
                            </Link>
                        </li>
                        <li>
                            <Link
                                to='/contact'
                                className='text-primary-white hover:text-primary-gray'
                            >
                                Contact Us
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div>
                <button className='button border border-primary-yellow text-primary-yellow py-2 px-4 rounded tracking-wider sm:block hidden'>
                    Log in
                </button>
                <button id='hamburger-menu' className='sm:hidden block' onClick={toggleMobileMenu}>
                    <img src={hamburgerMenuIcon} alt='Menu' className='h-7 sm:h-14' />
                </button>
            </div>
            <div
                id='mobile-menu'
                className={[
                    'absolute top-10 left-0 w-full bg-primary-black px-4 py-4 sm:hidden',
                    isMobileMenuOpen == undefined
                        ? 'hidden'
                        : isMobileMenuOpen
                          ? 'animate-slide-in-right'
                          : 'animate-slide-out-right',
                ].join(' ')}
            >
                <ul className='flex flex-col space-y-4 items-end'>
                    <li>
                        <Link to='/' className='text-primary-white hover:text-primary-gray'>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to='/show' className='text-primary-white hover:text-primary-gray'>
                            Show
                        </Link>
                    </li>
                    <li>
                        <Link to='/contact' className='text-primary-white hover:text-primary-gray'>
                            About
                        </Link>
                    </li>
                    <li>
                        <Link to='/contact' className='text-primary-white hover:text-primary-gray'>
                            Contact Us
                        </Link>
                    </li>
                </ul>
            </div>
        </header>
    )
}
