import { useState } from "react";
import { useNavigate } from '@tanstack/react-router'; // for go to payment
import SeatGrid from '../components/layout/SeatCompo/SeatGrid'
import Ticket from '../assets/icon/Ticket.svg'
import Remove from '../assets/icon/Trash.svg'


export default function SelectingSeat(){
    const [selectedSeats, setSelectedSeats] = useState([]);
    const seatPrice = 150; // 1 ticket price
    const totalPrice = selectedSeats.length * seatPrice; // sumTotal
    const navigate = useNavigate();
    
    const handleConfirm = () => {
    const reservation = {
      showTitle: "DISNEY ON ICE - LET’S DANCE 2025",
      showDate: "October 29th, 2025",
      showTime: "8:00 PM",
      showSeat: selectedSeats,
      showFee: 5.99,
      showPrice: totalPrice,
      showAmount: selectedSeats.length,
      showTimeStamp: new Date().toISOString(),
    };

    localStorage.setItem ("reservation", JSON.stringify(reservation));
    //  link to payment
    navigate({ to: "/Payment" });
    };

    return (
        <>
            <div className='mt-4 px-[2rem] sm:px-[3rem] lg:px-[5rem]'>
                <p className='text-title text-primary-yellow'>DISNEY ON ICE - LET’S DANCE 2025</p>
                <p className='text-subbody text-light-gray'>October 29th, 2025</p>
            </div>
            <div className='my-[2.5rem] flex flex-col lg:flex-row px-[2rem] sm:px-[3rem] lg:px-[5rem] gap-20'>
                <div>
                    <SeatGrid
                        selectedSeats={selectedSeats}
                        setSelectedSeats={setSelectedSeats}
                    />
                </div>
                <div className='flex justify-center items-center w-full'>
                    <div className='text-center'>
                        {/* if seat selected */}
                        {selectedSeats.length > 0 ? 
                        <>
                            <p className='text-primary-yellow text-subtitle'>Your selection</p>

                            <div className="text-left">
                                <p className="text-detail text-primary-white">
                                    {selectedSeats.length > 0 ? "Price include service fees. Per order payment fees may apply depending on digital payment method used.": ""}
                                </p>
                            </div>

                            {/* seat info */}
                            <div className="border-t border-primary-white my-4"></div>

                            {selectedSeats.map((seatId) => {
                                const row = seatId.charAt(0);
                                const seat = seatId;
                                return (
                                    <div key={seatId} className="SelectedSeatInfo mb-2">
                                        <div className="flex flex-row justify-between">
                                            <div className="text-left">
                                                <p className="text-body text-primary-yellow">Level</p>
                                                <p className="text-detail text-primary-white">Floor</p>
                                            </div>
                                            <div className="text-left">
                                                <p className="text-body text-primary-yellow">Row</p>
                                                <p className="text-detail text-primary-white">{row}</p>
                                            </div>
                                            <div className="text-left">
                                                <p className="text-body text-primary-yellow">Seat</p>
                                                <p className="text-detail text-primary-white">{seat}</p>
                                            </div>
                                            <img src={Remove} alt="Remove seat" 
                                                className="cursor-pointer hover:opacity-70" 
                                                onClick={() => setSelectedSeats(prev => prev.filter(id => id !== seatId))}
                                            />
                                        </div>
                                    </div>
                                );
                            })}

                            {/* ticket amout */}
                                <div class="border-t border-primary-white my-4"></div>
                                <div className="flex flex-row items-center gap-1">
                                    <img src={Ticket}/>
                                    <p className="text-detail text-primary-white"> x {selectedSeats.length}</p>
                                </div>
                                <div className="text-left">
                                    <p className="text-body text-primary-yellow">${totalPrice.toFixed(2)}</p>
                                </div>
                                <button onClick={handleConfirm}
                                className="bg-primary-yellow text-black py-3 px-6 mt-4 rounded hover:bg-secondary-yellow text-subbody w-full">Select the Seat</button>              
                        </>
                        : 
                        // original
                        <>
                            <p className='text-primary-yellow text-subtitle'>Select seat on the maps</p>
                            <p className="text-detail text-primary-white">Your choices will be added here</p>
                        </>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}