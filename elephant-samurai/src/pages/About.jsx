import History from '@/assets/img/History.png'
import SeatInfo from '@/assets/img/SeatInfo.png'
import MapLocation from '@/assets/img/Location.png'

function HistoryPhoto() {
    return <img src={History} alt='History' className='lg:w-[50%]' />
}

function SeatPhoto() {
    return <img src={SeatInfo} alt='Seat Info' className='lg:w-[40%]' />
}

function MapLocationPhoto() {
    return <img src={MapLocation} alt='Location' className='lg:w-[50%]' />
}

export default function About() {
    return (
        <>
            {/* Hero section */}
            <h1 className='mt-8 text-primary-yellow text-h1 px-[2rem] sm:px-[3rem] lg:px-[5rem]'>
                ABOUT US
            </h1>
            <div className='mt-4 px-[2rem] sm:px-[3rem] lg:px-[5rem] flex flex-col items-center'>
                <HistoryPhoto />
                <p className='mt-8 w-[85%] text-primary-white text-body'>
                    For more than twenty years, Samurai Elephant Studio Theatre has been a place
                    where creativity meets passion. From our earliest productions to today, we have
                    championed diverse voices and bold storytelling, bringing unforgettable
                    experiences to audiences across Vancouver.
                </p>
                <p className='mt-4 w-[85%] text-primary-white text-body'>
                    Over the years, we’ve hosted a wide range of performances from intimate
                    one-person shows to full-scale productions each reflecting our commitment to
                    innovation and artistic excellence. Notable milestones include our 10th
                    anniversary season, which introduced experimental stage design, and our
                    award-winning community outreach program that brings theatre to schools and
                    local organizations.
                </p>
                <p className='mt-4 w-[85%] text-primary-white text-body'>
                    Through it all, Samurai Elephant has remained a space where artists and
                    audiences come together to celebrate the magic of live performance, building a
                    legacy of creativity, connection, and unforgettable stories.
                </p>
            </div>

            {/* Seat section */}
            <div className='p-[2rem] sm:p-[3rem] lg:p-[5rem]' id='seatinfo'>
                <h3 className='text-primary-yellow text-h3'>SEATED INFO</h3>
                <div className='mt-4 flex flex-col sm:flex-col lg:flex-row gap-[2rem] sm:gap-[3rem] lg:gap-[5rem] justify-start items-center'>
                    <SeatPhoto />
                    <div className='text-primary-white text-body'>
                        <p>
                            Seating Info<br></br>
                            Our theatre offers a carefully designed seating layout to ensure the
                            best view from every spot. We provide:
                        </p>
                        <ul className='list-disc ml-5'>
                            <li>Comfortable seating with clear sight lines to the stage</li>
                            <li>Wheelchair-accessible areas</li>
                            <li>
                                Flexible arrangements for special performances and events For any
                                further inquiries about ticketing or seating please reach out to
                                info@samuraielephant.com.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Location */}
            <div className='p-[2rem] sm:p-[3rem] lg:p-[5rem]'>
                <h3 className='text-primary-yellow text-h3'>FIND US HERE</h3>
                <div className='mt-4 flex flex-col sm:flex-col lg:flex-row gap-[2rem] sm:gap-[3rem] lg:gap-[5rem] justify-start items-center'>
                    <MapLocationPhoto />
                    <div className='lg:w-[40%]'>
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
