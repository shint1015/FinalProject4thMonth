import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import logo from '@/assets/img/Logo.svg'
import hamburgerMenuIcon from '@/assets/icon/HamburgerMenu.svg'
import xmarkIcon from '@/assets/icon/xmark.svg'

export default function Header() {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(undefined)
    const toggleMobileMenu = () => {
        setMobileMenuOpen(prev => !prev)
    }

    return (
        <header className='flex items-center justify-between py-2 px-4 font-extralight'>
            <div className='flex items-center justify-between w-[60%] lg:w-[45%] xl:w-[33%]'>
                <div className='logo-container'>
                    <img src={logo} alt='Elephant Samurai Logo' className='h-7 sm:h-14' />
                </div>
                <nav className='sm:block hidden w-[80%]'>
                    <ul className='flex space-x-8 text-center'>
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
                    <img
                        src={isMobileMenuOpen ? xmarkIcon : hamburgerMenuIcon}
                        alt='Menu'
                        className='h-7 sm:h-14'
                    />
                </button>
            </div>
            <div
                id='mobile-menu'
                className={[
                    'absolute top-10 left-0 w-full bg-primary-black px-4 py-4 sm:hidden z-9999 h-full',
                    isMobileMenuOpen === undefined
                        ? 'hidden'
                        : isMobileMenuOpen
                          ? 'animate-slide-in-top'
                          : 'animate-slide-out-top',
                ].join(' ')}
            >
                <ul className='flex flex-col space-y-4 items-center'>
                    <li className=''>
                        <Link
                            to='/'
                            onClick={toggleMobileMenu}
                            className='text-primary-white hover:text-primary-gray'
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            to='/show'
                            onClick={toggleMobileMenu}
                            className='text-primary-white hover:text-primary-gray'
                        >
                            Show
                        </Link>
                    </li>
                    <li>
                        <Link
                            to='/about'
                            onClick={toggleMobileMenu}
                            className='text-primary-white hover:text-primary-gray'
                        >
                            About
                        </Link>
                    </li>
                    <li>
                        <Link
                            to='/contact'
                            onClick={toggleMobileMenu}
                            className='text-primary-white hover:text-primary-gray'
                        >
                            Contact Us
                        </Link>
                    </li>
                </ul>
            </div>
        </header>
    )
}
