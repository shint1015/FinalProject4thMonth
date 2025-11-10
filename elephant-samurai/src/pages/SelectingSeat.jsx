import SeatGrid from '../components/layout/SeatGrid'

export default function SelectingSeat(){
    return (
        <>
            <div className='mt-4 px-[2rem] sm:px-[3rem] lg:px-[5rem]'>
                <p className='text-title text-primary-yellow'>DISNEY ON ICE - LET’S DANCE 2025</p>
                <p className='text-subbody text-light-gray'>October 29th, 2025</p>
            </div>
            <div className='my-[2.5rem] flex flex-col lg:flex-row px-[2rem] sm:px-[3rem] lg:px-[5rem]'>
                <div>
                    <SeatGrid/>
                </div>
                <div className='flex justify-center items-center w-full'>
                    <div className='text-center'>
                        <p className='text-primary-yellow text-subtitle'>Select seat on the maps</p>
                        <p className='text-primary-white text-subbody'>Your choices will be added here</p>
                    </div>
                </div>
            </div>
        </>
    )
}