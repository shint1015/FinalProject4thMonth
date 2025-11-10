import { useState } from "react";
import SeatGrid from '../components/layout/SeatGrid'

export default function SelectingSeat(){
    const [selectedSeats, setSelectedSeats] = useState([]);

    return (
        <>
            <div className='mt-4 px-[2rem] sm:px-[3rem] lg:px-[5rem]'>
                <p className='text-title text-primary-yellow'>DISNEY ON ICE - LET’S DANCE 2025</p>
                <p className='text-subbody text-light-gray'>October 29th, 2025</p>
            </div>
            <div className='my-[2.5rem] flex flex-col lg:flex-row px-[2rem] sm:px-[3rem] lg:px-[5rem]'>
                <div>
                    <SeatGrid
                        selectedSeats={selectedSeats}
                        setSelectedSeats={setSelectedSeats}/>
                </div>
                <div className='flex justify-center items-center w-full'>
                    <div className='text-center'>
                        <p className='text-primary-yellow text-subtitle'>
                            {selectedSeats.length > 0 ? "Your selection" : "Select seat on the maps"}
                        </p>
                        <div className="text-left">
                            <p className="text-detail text-primary-white">Price include service fees. Per order payment fees may apply depending on digital payment method used.</p>
                        </div>
                        {/* divide line */}
                        <div class="border-t border-primary-white my-4"></div>
                        
                         {/*level  */}
                         <div className="text-left">
                            <p className="text-body text-primary-yellow">Level</p>
                            <p className="text-detail text-primary-white">Floor</p>
                         </div>
                         {/* divide line */}
                        <div class="border-t border-primary-white my-4"></div>

                        <p className='text-primary-white text-subbody'>
                            {selectedSeats.length > 0 ? selectedSeats.join(", ") : "Your choices will be added here"}
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}