import { Link } from '@tanstack/react-router'

export default function ShowCard({ show }) {
    return (
        <div className='bg-primary-black rounded-xl overflow-hidden flex flex-col mt-10'>
            <Link to='/show/$showId' params={{ showId: show.id }} className='block'>
                <p className='text-primary-white text-body mb-1'>{show.date}</p>
                <img
                    src={show.image_url}
                    alt={show.title}
                    className='w-full h-auto  object-cover'
                />
                <div className='py-4 font-dm-sans grow'>
                    <p className='text-sm text-light-gray'>{show.category}</p>
                    <h2 className='text-lg font-bold text-white mt-1 mb-3 leading-snug'>
                        {show.title}
                    </h2>
                </div>
            </Link>

            <div className='pb-4 mt-auto'>
                <Link to='/show/$showId' params={{ showId: show.id }} className='block'>
                    <button className='bg-primary-yellow text-black font-dm-sans py-2 px-4 rounded-md w-full hover:bg-secondary-yellow transition'>
                        Buy Tickets
                    </button>
                </Link>
            </div>
        </div>
    )
}
