import { useEffect, useState } from 'react';
import { showDetailRoute } from '@/route';

export default function ShowDetail() {
  const { showId } = showDetailRoute.useParams();

  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

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
    <div className="bg-primary-black pt-[2em] pb-[3em] flex flex-col justify-center items-center  px-6 text-primary-white font-dm-sans ">
      <div className=" w-full items-center flex flex-col md:flex-row gap-10 ">

        <div className="lg:ml-20">
          <img
            src={show.image_url}
            alt={show.title}
            className="w-full h-auto lg:w-[21vw] rounded-lg"
          />
        </div>

        {/* title */}
        <div className="flex-1">
          <h1 className="text-primary-yellow text-title text-detailTitle-weight tracking-[1%] mb-[-0.2em]">
            {show.title}
          </h1>
          <p className="text-light-gray text-subbody font-dm-sans mb-8">{show.category}</p>

          {/* top  */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-5 font-dm-sans ">
            {/* Date*/}
            <div>
              <p className="text-primary-yellow text-subtitle mb-[-0.1em] font-medium ">Date</p>
              <p className="text-detail text-primary-white">{show.date}</p>
            </div>

            {/* Price*/}
            <div className='relative lg:ml-[-4em]'>
              <p className="text-primary-yellow text-subtitle mb-[-0.1em] font-medium ">Price</p>
              <p>{show.pricing_rules[0].price}</p>
            </div>
          </div>

          {/* bottom  */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-y-5 font-dm-sans mt-5'>
            {/* Time*/}
            <div className=' relative top-0'>
              <p className="text-primary-yellow text-subtitle mb-[-0.1em] block font-medium">Time</p>
              <p className='block '>{show.showTime} </p>
            </div>

            <div className=' relative lg:ml-[-4em]'>
              <p className="text-primary-yellow text-subtitle mb-[-0.1em] font-medium ">Admission Policy</p>
              <p className="block max-w-[20rem]">{show.admission_policy.description}</p>
            </div>
          </div>


          {/* botton */}
          <div className="flex justify-center lg:justify-start">
            <button className="mt-[10%] w-[50%] lg:mt-[2%]  lg:w-[22%] py-3 bg-primary-yellow text-primary-black font-dm-sans rounded-md hover:bg-secondary-yellow transition">
              Select the Seat
            </button>
          </div>

        </div>
      </div>

      {/* description part */}
      <div className="flex flex-col items-center mt-10 px-6 font-dm-sans text-primary-white text-detail gap-5 max-w-330">
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
