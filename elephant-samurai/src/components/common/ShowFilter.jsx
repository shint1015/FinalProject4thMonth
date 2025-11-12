

export default function ShowFilter({
  searchTerm,
  setSearchTerm,
  categoryFilter,
  setCategoryFilter,
  dateFilter,
  setDateFilter,
  isCategoryOpen,
  setIsCategoryOpen,
  isDateOpen,
  setIsDateOpen,
  categories,
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6 w-full md:w-5/6 mx-auto mb-10">
      {/* Search bar */}
      <div className="flex items-center gap-2 border-b border-primary-yellow pb-1 w-full md:w-1/3">
        <img
          src="/MagnifyingGlass.svg"
          alt="search"
          className="w-5 h-5 mt-1 object-contain"
        />
        <input
          type="text"
          placeholder="Search shows"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-primary-black text-primary-white focus:outline-none focus:placeholder-primary-white text-sm font-dm-sans "
        />
      </div>

      {/* Filter buttons */}
      <div className="flex gap-3 md:gap-4 justify-end w-full md:w-auto">
        {/* Date */}
        <div className="relative">
          <button
            onClick={() => {
              setIsDateOpen(!isDateOpen);
              setIsCategoryOpen(false);
            }}
            className="flex items-center justify-between border border-primary-yellow text-white rounded-[5%] px-4 py-2 w-28 sm:w-32 text-sm font-dm-sans hover:bg-secondary-yellow hover:text-primary-black transition"
          >
            <span>{dateFilter ? dateFilter : "Date"}</span>
            <img
              src={isDateOpen ? "/Vector.png" : "/Vector.png"}
              alt="arrow"
              className="w-3 h-3 object-contain"
            />
          </button>

          {isDateOpen && (
            <div className="absolute top[-2%] right-0 bg-primary-black border border-primary-yellow p-3 z-50 w-28 sm:w-32 flex flex-col gap-2">
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="bg-primary-black text-primary-white border border-primary-yellow rounded-md px-2 py-1 text-sm focus:outline-none cursor-pointer w-full"
              />
              <button
                onClick={() => {
                  setDateFilter("");
                  setIsDateOpen(false);
                }}
                className="text-xs top-[-2%] text-primary-yellow underline hover:text-secondary-yellow transition text-center"
              >
                Clear
              </button>
            </div>
          )}
        </div>

        {/* Category */}
        <div className="relative">
          <button
            onClick={() => {
              setIsCategoryOpen(!isCategoryOpen);
              setIsDateOpen(false);
            }}
            className="flex items-center justify-between border border-primary-yellow text-primary-white rounded-[5%] px-4 py-2 w-36 sm:w-40 text-sm font-dm-sans hover:bg-[#E8E357] hover:text-black transition"
          >
            <span>{categoryFilter || "Categories"}</span>
            <img
              src={isCategoryOpen ? "/Vector.png" : "/Vector.png"}
              alt="arrow"
              className="w-3 h-3 object-contain"
            />
          </button>

          {isCategoryOpen && (
            <div className="absolute right-0 bg-primary-black border border-primary-yellow  w-full z-50">
              {categories.map((cat) => (
                <div
                  key={cat}
                  onClick={() => {
                    if (categoryFilter === cat) {
                      setCategoryFilter("");
                    } else {
                      setCategoryFilter(cat);
                    }
                    setIsCategoryOpen(false);
                  }}
                  className={`px-4 py-2 cursor-pointer text-sm border-b border-primary-yellow hover:bg-secondary-yellow hover:text-primary-black ${
                    categoryFilter === cat
                      ? "bg-secondary-yellow text-black font-medium"
                      : ""
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
  );
}

