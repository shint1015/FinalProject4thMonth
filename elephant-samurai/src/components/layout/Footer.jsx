import LogoDesktop from '@/assets/img/Logo_footer_Desktop.svg'
import LogoMobile from '@/assets/img/Logo_footer_Mb.svg'
import FacebookIcon from '@/assets/icon/FacebookLogo.svg'
import InstagramIcon from '@/assets/icon/InstagramLogo.svg'
import XIcon from '@/assets/icon/XLogo.svg'
import TiktokIcon from '@/assets/icon/TikTokLogo.svg'

export default function Footer() {
    return (
        <footer className='bg-primary-yellow text-primary-black font-extralight w-full'>
            <div className='flex pt-15 px-15 mb-6 flex-between justify-center flex-wrap m-auto'>
                <div className='w-[75%] md:w-[60%] lg:w-[55%] mb-6 sm:mb-0'>
                    <picture>
                        <source media='(min-width: 640px)' srcSet={LogoDesktop} />
                        <img src={LogoMobile} alt='Footer Image' className='w-full' />
                    </picture>
                </div>
                <div className='w-full sm:w-[25%] md:w-[40%] lg:w-[45%] sm:justify-items-end'>
                    <div className='mb-2 sm:mb-4'>
                        <ul className='m-auto sm:m-[initial] w-[35%] sm:w-full flex justify-between gap-x-1 sm:gap-x-2'>
                            <li>
                                <img className='w-6' src={FacebookIcon} alt='Facebook' />
                            </li>
                            <li>
                                <img className='w-6' src={InstagramIcon} alt='Instagram' />
                            </li>
                            <li>
                                <img className='w-6' src={TiktokIcon} alt='TikTok' />
                            </li>
                            <li>
                                <img className='w-6' src={XIcon} alt='X' />
                            </li>
                        </ul>
                    </div>
                    <div>
                        <div className='text-center sm:text-right leading-relaxed'>
                            111 Hollywood Street Vancouver
                            <br className='sm:hidden' /> BC 0A0 0A0
                        </div>
                        <div className='text-center sm:text-right leading-relaxed'>
                            +1(778)- 000-0000
                        </div>
                        <div className='text-center sm:text-right leading-relaxed'>
                            info@samuraielephant.com
                        </div>
                    </div>
                </div>
            </div>
            <div className='text-center py-8'>©2025 The Elephant group. All Rights Reserved.</div>
        </footer>
    )
}
