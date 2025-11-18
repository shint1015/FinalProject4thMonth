import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import logo from '@/assets/img/Logo.svg'
import hamburgerMenuIcon from '@/assets/icon/HamburgerMenu.svg'
import xmarkIcon from '@/assets/icon/xmark.svg'
import { useAuth } from '@/hook/useAuth'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import UserCircle from '@/assets/icon/UserCircle.svg'

export default function Header() {
    const { user, isAuthenticated, signOut } = useAuth()
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
                            <Link to='/shows' className='text-primary-white hover:text-primary-gray'>
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
                {isAuthenticated && user ? (
                    <>
                        {/* Profile dropdown */}
                        <Menu as='div' className='relative ml-3 sm:block hidden'>
                            <MenuButton className='relative flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-yellow'>
                                <span className='absolute -inset-1.5' />
                                <span className='sr-only'>Open User Menu</span>
                                <img
                                    alt='user profile'
                                    src={UserCircle}
                                    className='size-8 rounded-full bg-primary-black outline -outline-offset-1 outline-white/10'
                                />
                            </MenuButton>

                            <MenuItems
                                transition
                                className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-primary-black py-1 outline -outline-offset-1 outline-white/10 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in'
                            >
                                <MenuItem>
                                    <Link
                                        to='/profile/info'
                                        className='block px-4 py-2 text-sm text-primary-white data-focus:bg-white/5 data-focus:outline-hidden'
                                        >
                                        Profile
                                    </Link>
                                </MenuItem>
                                <MenuItem>
                                    <a
                                        type='button'
                                        onClick={signOut}
                                        className='block px-4 py-2 text-sm text-primary-white data-focus:bg-white/5 data-focus:outline-hidden'
                                    >
                                        Log Out
                                    </a>
                                </MenuItem>
                            </MenuItems>
                        </Menu>
                    </>
                ) : (
                    <>
                        <Link to='/login'>
                            <button className='button border border-primary-yellow text-primary-yellow hover:bg-primary-yellow hover:text-primary-black py-2 px-4 rounded tracking-wider sm:block hidden'>
                                Log In
                            </button>
                        </Link>
                    </>
                )}
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
                <div className='text-[1.25rem] p-3 text-center'>Main Menu</div>
                <ul className='flex flex-col space-y-4 items-center'>
                    <li className=''>
                        <Link
                            to='/'
                            onClick={toggleMobileMenu}
                            className='text-primary-white hover:text-primary-yellow'
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            to='/shows'
                            onClick={toggleMobileMenu}
                            className='text-primary-white hover:text-primary-yellow'
                        >
                            Show
                        </Link>
                    </li>
                    <li>
                        <Link
                            to='/about'
                            onClick={toggleMobileMenu}
                            className='text-primary-white hover:text-primary-yellow'
                        >
                            About
                        </Link>
                    </li>
                    <li>
                        <Link
                            to='/contact'
                            onClick={toggleMobileMenu}
                            className='text-primary-white hover:text-primary-yellow'
                        >
                            Contact Us
                        </Link>
                    </li>
                </ul>
                <div className='text-[1.25rem] mt-4 p-3 text-center'>Account</div>
                <ul className='flex flex-col space-y-4 items-center'>
                    {isAuthenticated && user ? (
                        <>
                            <li>
                                <Link
                                    to='/profile'
                                    onClick={toggleMobileMenu}
                                    className='text-primary-white hover:text-primary-yellow'
                                >
                                    Profile
                                </Link>
                            </li>
                            <li>
                                <button
                                    type='button'
                                    onClick={() => {
                                        signOut()
                                        toggleMobileMenu()
                                    }}
                                    className='text-primary-white hover:text-primary-yellow'
                                >
                                    Log Out
                                </button>
                            </li>
                        </>
                    ) : (
                        <li>
                            <Link
                                to='/login'
                                onClick={toggleMobileMenu}
                                className='text-primary-white hover:text-primary-yellow text-center'
                            >
                                Log In
                            </Link>
                        </li>
                    )}
                </ul>
            </div>
        </header>
    )
}
