import HeroSectionVideo from '@/assets/video/HeroSection.webm'
import Location from '@/assets/img/Location.png'
import { Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import ShowList from '@/components/common/ShowList'

function LocationPhoto() {
    return <img src={Location} alt='Location' className='lg:w-[50%]' />
}

export default function Home() {
    const [shows, setShows] = useState([])
    useEffect(() => {
        fetch('/data/event.json')
            .then(res => res.json())
            .then(setShows)
            .catch(err => console.error('Error fetching shows:', err))
    }, [])
    return (
        <>
            {/* Hero section */}
            <div className='relative w-full overflow-hidden'>
                <video
                    src={HeroSectionVideo}
                    className='absolute  top-0 left-0 w-full h-full object-cover'
                    autoPlay
                    loop
                    muted
                    playsInline
                />
                <div className='relative w-[100dvw] h-[60dvh] sm:h-[60dvh] lg:h-[100dvh] flex flex-col items-center justify-center text-center'>
                    <h1 className='text-primary-yellow text-display'>SAMURAI</h1>
                    <h1 className='mt-[-1rem] text-primary-yellow text-display'>ELEPHANT</h1>
                    <p className='text-primary-yellow text-title'>Studio Theatre</p>
                </div>
            </div>

            {/* Upcoming event */}
            <div className='p-[2rem] sm:p-[3rem] lg:p-[5rem]'>
                <h1 className='text-primary-yellow text-h1'>UPCOMING EVENT</h1>
                <ShowList shows={shows} />

                <div className='text-center'>
                    <Link
                        to='/shows'
                        className='border border-primary-yellow text-body text-primary-yellow font-dm-sans px-6 py-2 rounded-md hover:bg-primary-yellow hover:text-primary-black'
                    >
                        See All Event
                    </Link>
                </div>
            </div>

            {/* History */}
            <div className='relative w-full h-[550px] bg-cover bg-[image:var(--bg-history)] flex justify-center'>
                <div className='p-[5rem] flex justify-center flex-col text-center lg:w-[55%]'>
                    <h4 className='text-primary-yellow text-h4'>SINCE 1995,</h4>
                    <p className='mt-4 text-primary-white text-body'>
                        For more than twenty years, Samurai Elephant has stood as a space where
                        creativity meets passion, Uniting artists and audiences through
                        unforgettable stories on stage.
                    </p>
                    <p className='mt-4 text-primary-white text-body'>
                        Explore our{' '}
                        <Link to='/about#seatinfo' className='underline cursor-pointer'>
                            seating and venue layout ↗
                        </Link>{' '}
                        to plan your perfect view.
                    </p>
                </div>
            </div>

            {/* Location */}
            <div className='p-[2rem] sm:p-[3rem] lg:p-[5rem]'>
                <h1 className='text-primary-yellow text-h1'>FIND US HERE</h1>
                <div className='mt-4 flex flex-col sm:flex-col lg:flex-row gap-[2rem] sm:gap-[3rem] lg:gap-[5rem] justify-center items-center'>
                    <LocationPhoto />
                    <div>
                        <p className='text-primary-white text-body'>
                            The Sumarai Elephant Studio theater is located in the heart of downtown
                            Vancouver at 111 Hollywood Street.<br></br>
                            There are several parking lots within walking distance from the theatre
                            in addition to meter parking on Daiki St. & Shin St.
                        </p>
                        <p className='mt-4 text-primary-white text-body'>
                            Parking lot information, Easy Park:{' '}
                            <a className='underline'>www.easypark.ca ↗</a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
