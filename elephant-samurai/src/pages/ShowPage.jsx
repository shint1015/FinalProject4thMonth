import { useState, useEffect } from 'react'
import ShowCard from '@/components/common/ShowCard'
import ShowFilter from '@/components/common/ShowFilter'

export default function ShowPage() {
    const [shows, setShows] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [categoryFilter, setCategoryFilter] = useState('')
    const [dateFilter, setDateFilter] = useState('')
    const [isCategoryOpen, setIsCategoryOpen] = useState(false)
    const [isDateOpen, setIsDateOpen] = useState(false)

    // ✅ 新しく追加：何件表示するかを管理
    const [visibleCount, setVisibleCount] = useState(8)

    useEffect(() => {
        fetch('/data/event.json')
            .then(res => res.json())
            .then(setShows)
            .catch(err => console.error('Error fetching shows:', err))
    }, [])

    // 検索・フィルター
    const filteredShows = shows.filter(show => {
        const lower = searchTerm.toLowerCase()
        const matchSearch =
            show.title.toLowerCase().includes(lower) ||
            show.category.toLowerCase().includes(lower) ||
            show.tags.some(tag => tag.toLowerCase().includes(lower))

        const matchCategory = !categoryFilter || show.category === categoryFilter
        const matchDate =
            !dateFilter || new Date(show.time.start).toISOString().split('T')[0] === dateFilter

        return matchSearch && matchCategory && matchDate
    })

    const categories = [...new Set(shows.map(s => s.category))]

    // ✅ 表示用リスト（visibleCountまで）
    const visibleShows = filteredShows.slice(0, visibleCount)

    // ✅ ボタンクリックで表示数を増やす
    const handleViewMore = () => {
        setVisibleCount(prev => prev + 6)
    }

    return (
        <div className='bg-primary-black min-h-screen px-6 md:px-10 py-5 pb-20 text-primary-white'>
            <h1 className='text-h1 text-primary-yellow font-climate-crisis mb-8'>Shows</h1>

            {/* showFilter compo */}
            <div className='max-w-full'>
                <ShowFilter
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    categoryFilter={categoryFilter}
                    setCategoryFilter={setCategoryFilter}
                    dateFilter={dateFilter}
                    setDateFilter={setDateFilter}
                    isCategoryOpen={isCategoryOpen}
                    setIsCategoryOpen={setIsCategoryOpen}
                    isDateOpen={isDateOpen}
                    setIsDateOpen={setIsDateOpen}
                    categories={categories}
                />
            </div>

            {/* カード一覧 */}
            <section className='grid grid-cols-2 lg:grid-cols-4 gap-8 mx-auto'>
                {visibleShows.length > 0 ? (
                    visibleShows.map(show => <ShowCard key={show.id} show={show} />)
                ) : (
                    <p className='col-span-full text-center text-primary-yellow text-detail'>
                        No shows found.
                    </p>
                )}
            </section>

            {/* View More button */}
            {visibleCount < filteredShows.length && (
                <div className='text-center mt-10'>
                    <button
                        onClick={handleViewMore}
                        className='border border-primary-yellow text-body text-primary-yellow font-dm-sans px-6 py-2 rounded-md hover:bg-secondary-yellow hover:text-black transition'
                    >
                        View More
                    </button>
                </div>
            )}
        </div>
    )
}
