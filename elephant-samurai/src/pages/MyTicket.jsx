import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router"
import DateIcon from '../assets/icon/Date.svg'
import TimeIcon from '../assets/icon/Clock.svg'
import LocationIcon from '../assets/icon/Location.svg'
import Ticket from '../assets/icon/Ticket.svg'

export default function MyTickets() {
    const [myTickets, setMyTickets] = useState([]);
    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("reservations")) || [];
        console.log(saved)
        setMyTickets(saved);
    }, []);

    if (myTickets.length === 0) {
        return <p className="text-body text-primary-white px-[2rem] sm:px-[3rem] lg:px-[5rem] my-8">No ticket found.</p>;
    }
    return (
        <>
            <div className='px-[2rem] sm:px-[3rem] lg:px-[5rem]'>
                {/* add map to loop the ticket */}
                {myTickets.map((reservation, index) => (
                    <div key={index} className="mt-4 mb-12">
                        <div className='flex flex-col lg:flex-row gap-4'>
                            <img src={reservation.showImage} className=" w-[60%] lg:w-auto" />
                            {/* info box */}
                            <div className="flex flex-col justify-between">
                                <p className='text-body text-primary-yellow'>{reservation.showTitle}</p>
                                <div className='flex flex-row gap-2'>
                                    <img src={DateIcon} className='w-4 lg:w-6' />
                                    <p className='text-body lg:text-detail text-primary-white'>{reservation.showDate}</p>
                                </div>
                                <div className='flex flex-row gap-2'>
                                    <img src={TimeIcon} className='w-4 lg:w-6' />
                                    <p className='text-body lg:text-detail text-primary-white'>{reservation.showTime}</p>
                                </div>
                                <div className='flex flex-row gap-2'>
                                    <img src={LocationIcon} className='w-4 lg:w-6' />
                                    <div>
                                        <p className='text-body lg:text-detail text-primary-white'>Samarai Elephant Studio Theatre</p>
                                        <p className='text-body lg:text-detail text-dark-gray'>111 Hollywood Street Vancouver BC 0A0 0A0</p>
                                    </div>
                                </div>
                                {/* amount */}
                                <div className="flex flex-row justify-between items-center">
                                    <div className="flex flex-row items-center gap-1">
                                        <img src={Ticket} className='w-4 lg:w-6' />
                                        <p className="text-body lg:text-detail text-primary-white"> x {reservation.showTotalTicketAmount}</p>
                                    </div>
                                </div>
                                {/* paid */}
                                <p className="text-body lg:text-detail text-dark-gray">Card ending in **** **** **** {reservation.paymentInfo.cardNumber.slice(-4)} </p>
                                <Link to='/show/$showId' params={{ showId: reservation.showId }} className='block'>
                                    <button className="bg-primary-yellow text-black py-3 px-6 rounded hover:bg-secondary-yellow text-subbody mt-4 w-1/2">
                                        View Detail
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}