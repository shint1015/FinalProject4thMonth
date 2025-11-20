import { useState, useEffect } from 'react'
import ConfirmLogo from '@/assets/icon/Confirm.svg'
import Clock from '@/assets/icon/Clock.svg'
import Date from '@/assets/icon/Date.svg'
import Location from '@/assets/icon/Location.svg'
import Ticket from '@/assets/icon/Ticket.svg'
import Rectangle from '@/assets/img/Rectangle.png'
import { confirmRoute } from "@/route"
import { Link } from '@tanstack/react-router'

export default function Confirm() {
    const { reservationId } = confirmRoute.useParams()
    const [booking, setBooking] = useState(null)

    useEffect(() => {
        const data = localStorage.getItem('reservations')
        const target = JSON.parse(data).find(item => item.reservationId === reservationId)
        if (target) setBooking(target)
    }, [])
    if (!booking) return <div>Loading...</div>

    return (
        <div className='bg-black text-white min-h-screen flex flex-col items-center justify-center'>
            <section id='displayArea' className='grid-row bg-black min-h-full text-center w-full'>
                <div className=''>
                    <img src={ConfirmLogo} alt='logo' className='mx-auto mb-4 w-[10%] h-[10%]' />
                </div>
                <div id='title'>
                    <h4 className='mb-4 text-h4 text-primary-yellow'>YOU GOT THE TICKET!</h4>
                </div>

                <div
                    id='DetailBox'
                    className='flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12 justify-center'
                >
                    <div id='eventImage' className='m-0 sm:ml-24'>
                        <img src={Rectangle} alt='Event' className='w-64 h-auto ' />
                    </div>

                    <div
                        id='textPart'
                        className='max-w-lg flex flex-col gap-4 text-center md:text-left mt'
                    >
                        {/* <!-- title. text-body text-primary-yellow--> */}
                        <h2 className='text-body text-primary-yellow mt-12 mb-2'>
                            {booking.showTitle}
                        </h2>

                        {/* <!-- date.   from here text-detail text-primary-white font-DM-Sans --> */}
                        <div className='flex items-center gap-2 justify-center md:justify-start'>
                            <img src={Date} className='w-6 h-6' />
                            <p className='text-detail text-primary-white'>{booking.showDate}</p>
                        </div>

                        {/* <!--time --> */}
                        <div className='flex items-center gap-2 justify-center md:justify-start'>
                            <img src={Clock} className='w-6 h-6' />
                            <p className='text-detail text-primary-white'>{booking.showTime}</p>
                        </div>

                        {/* <!--location--> */}
                        <div className='flex items-start gap-2 justify-center md:justify-start'>
                            <img src={Location} className='w-6 h-6 mt-1' />
                            <div className='leading-tight'>
                                <p className='text-detail text-primary-white'>
                                    Samurai Elephant Studio Theatre
                                </p>

                                {/* <!--only here text light-gray--> */}
                                <p className='text-detail text-light-gray'>
                                    111 Hollywood Street, Vancouver BC 0A0 0A0
                                </p>
                            </div>
                        </div>

                        {/* <!--ticket amount --> */}
                        <div className='flex items-center gap-2 justify-center md:justify-start'>
                            <img src={Ticket} className='w-6 h-6' />
                            <p className='text-detail text-primary-white'>
                                {booking.showSelectedSeat.length}
                            </p>
                        </div>
                    </div>
                </div>

                <Link to='/profile/mytickets'>
                <button className='mt-8 bg-primary-yellow text-primary-black w-60 px-8 py-3 rounded-[3%] hover:bg-secondary-yellow transition'>
                    View My Ticket
                </button>
                </Link>
            </section>
        </div>
    )
}
