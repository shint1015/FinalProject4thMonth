import { shows } from "../data/event.json";



export default function ShowPage() {
 

    return (
        <main className="bg-black min-h-screen  px-10 py-8">
            {/*title*/}
            <h1 className="text-5xl text-primary-yellow font-climate-crisis mb-8 ">Shows</h1>

            {/* bar filter*/}
            <div className="flex justify-between items-center mb-8">
                <input
                    type="text"
                    placeholder="Search shows"
                    className="w-1/2 bg-primary-black border-b border-gray-600 text-primary-white focus:outline-none"
                />
                <div className="flex gap-2">
                    <button className="flex bg-primary-black border border-primary-yellow text-primary-white rounded-[10%] px-3 py-1">
                        <span>Date  </span>
                        <img src="/assets/img/CaretDown.png" alt="icon" className="w-5 h-5" />
                    </button>

                    <button className="flex bg-primary-black border border-primary-yellow text-primary-white rounded-[10%] px-3 py-1">
                        <span>Date</span>
                        <img src="/assets/img/CaretDown.png" alt="icon" className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* card part */}
            <section className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {shows.map((show, i) => (//index as key
                    <div key={i} className="bg-primary-black  ">
                        <p className="text-primary-white text-sm mb-1">{show.date}</p>
                        <img src={show.img} alt={show.title} className="w-full h-60 object-cover"
                        />
                        <div className="p-4 font-dm-sans">
                            
                            <p className="text-sm text-light-gray ">{show.category}</p>
                            <h2 className="text-lg font-bold text-white mt-1 mb-3 leading-snug">
                                {show.title}
                            </h2>

                            <button className="bg-primary-yellow text-black font-dm-sans py-2 px-4 rounded-md w-full hover:bg-yellow-300 transition">
                                Buy Tickets
                            </button>

                        </div>
                    </div>
                ))}
            </section>

            {/* View Mor */}
            <div className="text-center mt-10">
                <button className="border border-primary- text-yellow-400 font-dm-sans px-6 py-2 rounded-md hover:bg-yellow-400 hover:text-black transition">
                    View More
                </button>
            </div>
        </main>
    );
}

{/* VarList

    --color-primary-yellow: #e7ec5c;
    --color-secondary-yellow: #e0e389;
    --color-primary-black: #060606;
    --color-dark-gray: #a7a6a6;
    --color-light-gray: #d9d9d9;
    --color-primary-white: #f8f8f8;
    --font-climate-crisis: 'Climate Crisis', sans-serif;
    --font-dm-sans: 'DM Sans', sans-serif;
    --text-display: 2.5rem; 40px
    --text-h1: 2.25rem; 36px
    --text-h2: 2rem; 32px
    --text-h3: 1.75rem; 28px
    --text-h4: 1.5rem; 24px
    --text-title: 1.25rem; 20px 
    --text-subtitle: 1.125rem; 18px 
    --text-body: 1rem;  16px 
    --text-subbody: 0.875rem;  14px 
    --text-detail: 0.75rem; 12px 

  */}