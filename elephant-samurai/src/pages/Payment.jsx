import { useEffect, useState } from "react"; 
import ShowsPhoto from '../assets/img/DisneyOnIce.png'
import DateIcon from '../assets/icon/Date.svg'
import TimeIcon from '../assets/icon/Clock.svg'
import LocationIcon from '../assets/icon/Location.svg'
import Ticket from '../assets/icon/Ticket.svg'
import CountDown from "../components/layout/Countdown";
import { useNavigate } from "@tanstack/react-router"; //link to dashbord

export default function Payment(){
    const [reservation, setReservation] = useState(null); // for call localStorage
    // Payment
    const [cardNumber, setCardNumber] = useState("");
    const [cardName, setCardName] = useState("");
    const [cardCvv, setCardCvv] = useState("");
    const [cardExpiryDate, setCardExpiryDate] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        const saved = localStorage.getItem("reservation");
        if (saved) {
            setReservation(JSON.parse(saved));
        }
    }, []); // add array to make it one time
    if (!reservation) {
        return <p className="text-body text-primary-white">No reservation found.</p>;
    }
    const GotoDashboard = (e) => {
        e.preventDefault();
        const paymentInfo = {
            cardNumber,
            cardName,
            cardCvv,
            cardExpiryDate,
        };
        const updatedReservation = {
            ...reservation,
            paymentInfo,
        };
        localStorage.setItem("reservation", JSON.stringify(updatedReservation)); //link both ticket + payment to dashboard
        navigate({ to:"/profile/dashboard"});
    }

    return (
    <>
        <div className='mt-4 px-[2rem] sm:px-[3rem] lg:px-[5rem] flex justify-between'>
            <p className='text-title text-primary-yellow'>Check Out</p>
            <div className="text-right">
                <p className='text-subtitle text-primary-white'>Time Left</p>
                <CountDown startMinutes={10} />
            </div>
        </div>
        <div className='my-[2.5rem] flex flex-col lg:flex-row px-[2rem] sm:px-[3rem] lg:px-[5rem] mb-30 gap-10 lg:gap-0'>
            {/* left box */}
            <div className="lg:w-[1/2]">
                <p className='text-subtitle text-primary-yellow'>Order</p>
                <div className='flex flex-col lg:flex-row gap-4'>
                    <img src={ShowsPhoto} className='w-1/2 lg:w-1/3'/>
                    {/* info box */}
                    <div className="flex flex-col justify-between">
                        <p className='text-body text-primary-white'>{reservation.showTitle}</p>
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
                        <div class="border-t border-primary-white my-4"></div>
                        {/* amount */}
                        <div className="flex flex-row justify-between items-center">
                            <div className="flex flex-row items-center gap-1">
                                <img src={Ticket}/>
                                <p className="text-body lg:text-detail text-primary-white"> x {reservation.showTotalTicketAmount}</p>
                            </div>
                            <p className="text-body lg:text-detail text-primary-white">${reservation.showTotalPrice.toFixed(2)}</p>
                        </div>
                        <div class="border-t border-primary-white my-4"></div>

                        {/* total price */}
                        <div className="flex flex-row justify-between">
                            <p className="text-body lg:text-detail text-primary-white">Subtotal</p>
                            <p className="text-body lg:text-detail text-primary-white">${reservation.showTotalPrice}</p>
                        </div>
                        <div className="flex flex-row justify-between">
                            <p className="text-body lg:text-detail text-primary-white">Service Fee</p>
                            <p className="text-body lg:text-detail text-primary-white">${reservation.showFee}</p>
                        </div>
                        <div className="flex flex-row justify-between">
                            <p className="text-body lg:text-detail text-primary-white">Total</p>
                            <p className="text-body lg:text-detail text-primary-yellow">${(reservation.showTotalPrice+reservation.showFee).toFixed(2)}</p>
                        </div>                                                      
                    </div>
                </div>
            </div>

            {/* right box */}
            <div className="lg:w-[1/2]">
                <p className='text-subtitle text-primary-yellow'>Payment</p>
                <form className="flex flex-col justify-between gap-1"
                onSubmit={GotoDashboard}>
                    <div>
                        <p className='text-subbody text-primary-white'>Card Number</p>
                        <input type="tel" 
                        placeholder="1234 5678 9678 1098" 
                        className="bg-primary-white border-none placeholder-dark-grey text-black text-subbody focus:outline-none p-[1rem] rounded-[4px] w-full"
                        value={cardNumber} onChange={(e) => setCardNumber(e.target.value)}
                        />
                    </div>
                    <div>
                        <p className='text-subbody text-primary-white'>Name On Card</p>
                        <input type="text" 
                        placeholder="EnterName" 
                        className="bg-primary-white border-none placeholder-dark-grey text-black text-subbody focus:outline-none p-[1rem] rounded-[4px] w-full"
                        value={cardName} onChange={(e) => setCardName(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-row gap-4">
                        <div className="w-1/2">
                            <p className='text-subbody text-primary-white'>CVV Code</p>
                            <input type="tel" 
                            placeholder="CVV" 
                            className="bg-primary-white border-none placeholder-dark-grey text-black text-subbody focus:outline-none p-[1rem] rounded-[4px] w-full"
                            value={cardCvv} onChange={(e) => setCardCvv(e.target.value)}
                            />
                        </div>
                        <div className="w-1/2">
                            <p className='text-subbody text-primary-white'>Expired Date</p>
                            <input type="date" 
                            placeholder="12/01" 
                            className="bg-primary-white border-none placeholder-dark-grey text-black text-subbody focus:outline-none p-[1rem] rounded-[4px] w-full"
                            value={cardExpiryDate} onChange={(e) => setCardExpiryDate(e.target.value)}
                            />
                        </div>
                    </div>
                    <button type="submit" className="bg-primary-yellow text-black py-3 px-6 mt-4 rounded hover:bg-secondary-yellow text-subbody w-full">Place Order</button>
                </form>
            </div>
        </div>
    </>
    )
}