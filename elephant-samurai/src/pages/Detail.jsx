import { useEffect, useState } from 'react'
import { showDetailRoute } from '@/route'
import { Link } from '@tanstack/react-router'

export default function ShowDetail() {
    const { showId } = showDetailRoute.useParams()

    const [show, setShow] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('/data/event.json')
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok')
                return response.json()
            })
            .then(data => {
                const found = data.find(item => item.id === showId)
                setShow(found)
                setLoading(false)
            })
            .catch(error => {
                console.error('Error loading show detail:', error)
                setLoading(false)
            })
    }, [])

    if (loading) {
        return <div className='text-primary-white text-center py-20'>Loading...</div>
    }

    if (!showId || !show) {
        return <div className='text-primary-white text-center py-20'>Show not found</div>
    }

    return (
        <div className='bg-primary-black pt-[2em] pb-[3em] flex flex-col px-6 md:px-10 text-primary-white font-dm-sans'>
            <div className='lg:w-full flex flex-col md:flex-row gap-10'>
                <div className='flex justify-center items-center'>
                    <img src={show.image_url} alt={show.title} className='w-[60%] lg:w-full h-auto' />
                </div>

                {/* title */}
                <div className='flex-1'>
                    <h1 className=' text-primary-yellow text-title tracking-[1%] md:text-left'>
                        {show.title}
                    </h1>
                    <p className='text-subbody font-dm-sans md:text-left mb-4'>
                        {show.category}
                    </p>

                    {/* top  */}
                    <div className='grid grid-cols-1 md:grid-cols-2 font-dm-sans  md:text-left'>
                        {/* Date*/}
                        <div>
                            <p className='text-primary-yellow text-subtitle'>Date</p>
                            <p className='text-body'>{show.date}</p>
                        </div>

                        {/* Price*/}
                        <div>
                            <p className='text-primary-yellow text-subtitle'>Price</p>
                            <p className='text-body'>{show.pricing_rules[0].price}</p>
                        </div>
                    </div>

                    {/* bottom  */}
                    <div className='grid grid-cols-1 lg:grid-cols-2 font-dm-sans'>
                        {/* Time*/}
                        <div>
                            <p className='text-primary-yellow text-subtitle'>Time</p>
                            <p className='text-body'>{show.showTime} </p>
                        </div>

                        <div>
                            <p className='text-primary-yellow text-subtitle'>Admission Policy</p>
                            <p className='text-body'>{show.admission_policy.description}</p>
                        </div>
                    </div>

                    {/* botton */}
                    <Link to='/seatselecting/$showId' params={{ showId: showId }}>
                        <div className='flex lg:justify-start'>
                            <button className='mt-5 py-3 px-5 bg-primary-yellow text-primary-black font-dm-sans rounded-md hover:bg-secondary-yellow transition'>
                                Select the Seat
                            </button>
                        </div>
                    </Link>
                </div>
            </div>

            {/* description part */}
            <div className='flex flex-col items-center mt-10 text-body lg:text-detail gap-5'>
                <div>
                    <p>{show.description.summary1}</p>
                </div>
                <div>
                    <p>{show.description.summary2}</p>
                </div>

                <div>
                    <p>{show.description.summary3}</p>
                </div>
                <div>
                    <p>{show.description.summary4}</p>
                </div>
            </div>
        </div>
    )
}
