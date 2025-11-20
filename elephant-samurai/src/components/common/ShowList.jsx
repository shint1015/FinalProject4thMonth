import ShowCard from '@/components/common/ShowCard'

export default function ShowList({ shows }) {
    return (
        <section className='grid grid-cols-2 lg:grid-cols-4 gap-8 mx-auto'>
            {shows.length > 0 ? (
                shows.map(show => <ShowCard key={show.id} show={show} />)
            ) : (
                <p className='col-span-full text-center text-primary-yellow text-detail'>
                    No shows found.
                </p>
            )}
        </section>
    )
}
