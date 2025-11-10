import { useEffect, useState } from 'react';
import { showDetailRoute } from '@/route';

export default function ShowDetail() {
  const { showId } = showDetailRoute.useParams();

  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const resonse = await fetch('/data/event.json')
    //     const data = await resonse.json()
    //     const targetData = data.find((item) => item.id === showId);
    //     console.log(targetData)
    //     setShow(data[0])
    //   } catch (e) {
    //     console.log(e)
    //   } finally {
    //     setLoading(false)
    //   }
    // }
    // fetchData()

    fetch('/data/event.json')
      .then((response) => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then((data) => {
        const found = data.find((item) => item.id === showId);
        console.log(found)
        setShow(found);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error loading show detail:', error);
        setLoading(false);
      });
  }, []);


  if (loading) {
    return <div className="text-primary-white text-center py-20">Loading...</div>;
  }


  if (!showId || !show) {
    return <div className="text-primary-white text-center py-20">Show not found</div>;
  }

  return (
    <div className="bg-primary-black min-h-screen flex flex-col justify-center items-center py-15 px-6 text-primary-white font-dm-sans ">
      <div className=" w-full flex flex-col md:flex-row gap-10 ">

        <div className="ml-20">
          <img
            src={show.image_url}
            alt={show.title}
            className="w-[22.43vw] h-auto rounded-lg"
          />
        </div>

        {/* title */}
        <div className="flex-1">
          <h1 className="text-primary-yellow font-semibold text-title font-dm-sans tracking-widest mb-1">
            {show.title}
          </h1>
          <p className="text-light-gray text-subbody font-dm-sans mb-8">{show.category}</p>

          {/* top  */}
          <div className="grid grid-cols-2 gap-y-5 font-dm-sans ">
            {/* Date*/}
            <div>
              <p className="text-primary-yellow text-subtitle mb-1 font-medium ">Date</p>
              <p className="text-detail text-primary-white">{show.date}</p>
            </div>

            {/* Price*/}
            <div className='relative ml-[-4em]'>
              <p className="text-primary-yellow text-subtitle mb-1 font-medium ">Price</p>
              <p>{show.pricing_rules[0].price}</p>
            </div>
          </div>

          {/* bottom  */}
          <div className='grid grid-cols-2 gap-y-5 font-dm-sans mt-5'>
            {/* Time*/}
            <div className=' relative top-0'>
              <p className="text-primary-yellow text-subtitle mb-1 block font-medium">Time</p>
              <p className='block '>{show.showTime} </p>
            </div>

            <div className=' relative ml-[-4em]'>
              <p className="text-primary-yellow text-subtitle mb-1 font-medium ">Admission Policy</p>
              <p className="block max-w-[20rem]">{show.admission_policy.description}</p>
            </div>
          </div>

          {/* botton */}
          <button className="mt-5 w-[22%] bg-primary-yellow text-primary-black  font-dm-sans py-3 px-8 rounded-md hover:bg-secondary-yellow transition">
            Select the Seat
          </button>
        </div>
      </div>

      {/* description part */}
      <div className="flex flex-col items-center mt-16 px-6 font-dm-sans text-primary-white text-detail gap-5 max-w-330">
        <div>
          <p>{show.description.summary1}</p>
        </div>
        <div >
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