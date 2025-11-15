import { useEffect, useState } from "react";
import DateIcon from '../assets/icon/Date.svg'
import TimeIcon from '../assets/icon/Clock.svg'
import LocationIcon from '../assets/icon/Location.svg'
import Ticket from '../assets/icon/Ticket.svg'

export default function MyTickets() {
    const [reservation, setReservation] = useState(null)

    useEffect(() => {
    const saved = localStorage.getItem("reservation");
    
    if (saved) {
      setReservation(JSON.parse(saved));
    }
    }, []);

    if (!reservation) {
        return <p className="text-body text-primary-white">No ticket found.</p>;
    }

    return(
        <>
        <div className='px-[2rem] sm:px-[3rem] lg:px-[5rem]'>
            <div className="mt-4 mb-12">
                <div className='flex flex-col lg:flex-row gap-4'>
                    <img src={reservation.showImage} className=" w-[60%] lg:w-auto"/>
                    {/* info box */}
                    <div className="flex flex-col justify-between">
                        <p className='text-body text-primary-yellow'>{reservation.showTitle}</p>
                        <div className='flex flex-row gap-2 items-center'> 
                            <img src={DateIcon} className='w-4 lg:w-6'/>
                            <p className='text-body lg:text-detail text-primary-white'>{reservation.showDate}</p>
                        </div>
                        <div className='flex flex-row gap-2'> 
                            <img src={TimeIcon} className='w-4 lg:w-6 items-center'/>
                            <p className='text-body lg:text-detail text-primary-white'>{reservation.showTime}</p>
                        </div>
                        <div className='flex flex-row gap-2'> 
                            <img src={LocationIcon} className='w-4 lg:w-6 items-center'/>
                            <div>
                                <p className='text-body lg:text-detail text-primary-white'>Samarai Elephant Studio Theatre</p>
                                <p className='text-body lg:text-detail text-dark-gray'>111 Hollywood Street Vancouver BC 0A0 0A0</p>
                            </div>
                        </div>
                        {/* amount */}
                        <div className="flex flex-row justify-between items-center">
                            <div className="flex flex-row items-center gap-1">
                                <img src={Ticket}/>
                                <p className="text-body lg:text-detail text-primary-white"> x {reservation.showTotalTicketAmount}</p>
                            </div>
                        </div>   
                        {/* paid */}
                        {/* just check if payment not work shows ---- */}
                        <p className="text-body lg:text-detail text-primary-white">Paid with: **** **** **** {reservation.paymentInfo.cardNumber.slice(-4)|| "----"} </p> 
                        <button type="submit" className="bg-primary-yellow text-black py-3 px-6 mb-8 rounded hover:bg-secondary-yellow text-subbody w-1/2">View Detail</button>                                           
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}