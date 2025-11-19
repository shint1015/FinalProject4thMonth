export default function ShowFilter({
    searchTerm,
    setSearchTerm,
    categoryFilter,
    setCategoryFilter,
    dateFilter,
    setDateFilter,
    isCategoryOpen,
    setIsCategoryOpen,
    categories,
}) {
    const handleDateChange = e => {
        setDateFilter(e.target.value)
    }

    return (
        <div className='flex flex-col px-25 md:flex-row md:items-center md:justify-between gap-4 md:gap-6 w-full mx-auto mb-5'>
            {/* Search bar */}
            <div className='flex items-center gap-2 border-b border-primary-yellow pb-1 w-20 md:w-1/3'>
                <img
                    src='/MagnifyingGlass.svg'
                    alt='search'
                    className='w-5 h-5 mt-1 object-contain'
                />
                <input
                    type='text'
                    placeholder='Search shows'
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className='w-full bg-primary-black text-primary-white focus:outline-none focus:placeholder-primary-white text-sm font-dm-sans'
                />
            </div>

            {/* Filter buttons */}
            <div className='flex gap-2 justify-end w-full lg:w-auto relative'>
                {/* Date button using label */}
                <div className='relative'>
                    <label
                        htmlFor='date-input'
                        className='flex items-center justify-between border border-primary-yellow text-white rounded-[5%] px-4 py-2 text-sm font-dm-sans hover:bg-secondary-yellow hover:text-primary-black transition cursor-pointer'
                    >
                        <span>{dateFilter ? dateFilter : 'Date'}</span>
                        <svg
                            className='ml-2 hover:text-primary-black'
                            xmlns='http://www.w3.org/2000/svg'
                            width='24'
                            height='24'
                            viewBox='0 0 24 24'
                            aria-hidden='true'
                            focusable='false'
                            role='img'
                        >
                            <path d='M6 9l6 6 6-6' fill='none' stroke='currentColor' />
                        </svg>
                    </label>

                    <input
                        id='date-input'
                        type='date'
                        value={dateFilter}
                        onChange={handleDateChange}
                        className='absolute top-0 left-0 opacity-0 w-full h-full cursor-pointer hover:bg-secondary-yellow'
                    />
                </div>

                {dateFilter && (
                    <button
                        onClick={() => setDateFilter('')}
                        className='text-xs text-primary-yellow underline hover:text-secondary-yellow transition'
                    >
                        Clear
                    </button>
                )}

                {/* Category */}
                <div className='relative'>
                    <button
                        onClick={() =>{
                          if(isCategoryOpen){
                            setCategoryFilter('')
                          }
                          setIsCategoryOpen(!isCategoryOpen)
                          }}
                        className='flex items-center justify-between border border-primary-yellow text-primary-white rounded px-4 py-2 text-sm font-dm-sans hover:bg-secondary-yellow hover:text-primary-black transition whitespace-nowrap'
                    >
                        <span className='truncate max-w-32'>{
                          isCategoryOpen?'Categories'
                        :categoryFilter || 'Categories'}</span>
                        <svg
                            className='ml-2 hover:text-primary-black'
                            xmlns='http://www.w3.org/2000/svg'
                            width='24'
                            height='24'
                            viewBox='0 0 24 24'
                            aria-hidden='true'
                            focusable='false'
                            role='img'
                        >
                            <path d='M6 9l6 6 6-6' fill='none' stroke='currentColor' />
                        </svg>
                    </button>

                    {isCategoryOpen && (
                        <div className='absolute right-0 bg-primary-black border border-primary-yellow w-full z-50'>
                            {categories.map(cat => (
                                <div
                                    key={cat}
                                    onClick={() => {
                                        setCategoryFilter(categoryFilter === cat ? '' : cat)
                                        setIsCategoryOpen(false)
                                    }}
                                    className={`px-4 py-2 cursor-pointer text-sm border-b border-primary-yellow hover:bg-secondary-yellow hover:text-primary-black 
                                      ${
                                          categoryFilter === cat
                                              ? 'bg-secondary-yellow text-black font-medium'
                                              : ''
                                      }`}
                                >
                                    {cat}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
