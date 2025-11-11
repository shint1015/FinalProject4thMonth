import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";


export default function ShowPage() {
    const [shows, setShows] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState(""); // category
    const [dateFilter, setDateFilter] = useState(""); // date
    
    // fetch data
    useEffect(() => {
        fetch("/data/event.json")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                console.log("fetched show:", data);
                setShows(data);
            })
            .catch((error) => console.error("Error fetching shows:", error));
    }, []);

    // filter
    const filteredShows = shows.filter((show) => {
        const lower = searchTerm.toLowerCase();

        // searchTermによるフィルター
        const matchesSearch =
            show.title.toLowerCase().includes(lower) ||
            show.category.toLowerCase().includes(lower) ||
            show.tags.some((tag) => tag.toLowerCase().includes(lower));

        // categoryFilterによるフィルター（空文字なら無視）
        const matchesCategory =
            !categoryFilter || show.category === categoryFilter;

        // dateFilter
       
        const matchesDate =
            !dateFilter ||
            new Date(show.time).toISOString().split("T")[0] === dateFilter;

        return matchesSearch && matchesCategory && matchesDate;
    });



    return (
        <main className="bg-primary-black min-h-screen px-10 py-8">
            {/* title */}
            <h1 className="text-h1 text-primary-yellow font-climate-crisis mb-8 ml-[1.5em]">
                Shows
            </h1>

            {/* bar filter */}
            <div className="flex gap-2 w-full mx-[6em]">
                {/* Search bar with icon */}

                
                <div className="flex gap-2 border-b border-primary-yellow pb-1 w-[25em]">
                    <img
                        src="/MagnifyingGlass.svg"
                        alt="icon"
                        className="w-5 h-5 mt-1"
                    />
                    <input
                        type="text"
                        placeholder="Search shows"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-1/2 bg-primary-black text-primary-white focus:outline-none"
                    />
                </div>

                <div className="flex gap-4 ml-[32em]">
                {/* Date select */}
                <input
                    type="date"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="flex bg-primary-black border border-primary-yellow text-primary-white rounded-[10%] px-3 py-1 cursor-pointer focus:outline-none ml-auto"
                />

                {/* Category select */}
                <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="flex bg-primary-black border border-primary-yellow text-primary-white rounded-[10%] px-3 py-1 cursor-pointer focus:outline-none appearance-none"
                >
                    <option value="">Categories</option>
                    {[...new Set(shows.map((show) => show.category))].map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
                </div>
            </div>

            {/* card part */}
            <section className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:w-[85%] mx-auto">
                {filteredShows.map((show) => (
                    <div
                        key={show.id}
                        className="bg-primary-black rounded-xl overflow-hidden hover:bg-[#111] transition flex flex-col mt-10"
                    >
                        <Link
                            to="/show/$showId"
                            params={{ showId: show.id }}
                            className="block"
                        >
                            <p className="text-primary-white text-body mb-1">{show.date}</p>
                            <img
                                src={show.image_url}
                                alt={show.title}
                                className="w-full h-80 object-cover"
                            />
                            <div className="p-4 font-dm-sans grow">
                                <p className="text-sm text-light-gray">{show.category}</p>
                                <h2 className="text-lg font-bold text-white mt-1 mb-3 leading-snug">
                                    {show.title}
                                </h2>
                            </div>
                        </Link>

                        {/* button */}
                        <div className="px-4 pb-4 mt-auto">
                            <Link
                                to="/show/$showId"
                                params={{ showId: show.id }}
                                className="block"
                            >
                                <button className="bg-primary-yellow text-black font-dm-sans py-2 px-4 rounded-md w-full hover:bg-yellow-300 transition">
                                    Buy Tickets
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </section>

            {/* View More */}
            <div className="text-center mt-10">
                <button className="border text-primary-yellow font-dm-sans px-6 py-2 rounded-md hover:bg-primary-yellow hover:text-black transition">
                    View More
                </button>
            </div>
        </main>
    );
}
