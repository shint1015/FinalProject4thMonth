import HeroSectionVideo from "@/assets/video/HeroSection.webm"
import Location from '@/assets/img/Location.png';

function LocationPhoto() {
  return <img src={Location} alt="Location" className="lg:w-[50%]"/>;
}

export default function Home() {
    return (
        <>
            {/* Hero section */}
          <div className="relative w-full h-full overflow-hidden">
            <video src={HeroSectionVideo} className="absolute  top-0 left-0 w-full h-full object-cover" autoPlay loop muted playsInline/>
            <div className="relative w-[100dvw] h-[100dvh] flex flex-col items-center justify-center text-center">
              <h1 className="text-primary-yellow text-display">
                SAMURAI
              </h1>
              <h1 className="mt-[-1rem] text-primary-yellow text-display">
                ELEPHANT
              </h1>
              <p className="text-primary-yellow text-title">
                Studio Theatre
              </p>
            </div>
          </div>

          {/* Upcoming event */}
          <div className="p-[2rem] sm:p-[3rem] lg:p-[5rem]">
            <h1 className="text-primary-yellow text-h1">
              UPCOMING EVENT
            </h1>

            {/* wait for Daiki part */}
          </div>

          {/* History */}
          <div className="relative w-full h-[550px] bg-cover bg-[image:var(--bg-history)] flex justify-center">
            <div className="p-[5rem] flex justify-center flex-col text-center lg:w-[55%]">
              <h4 className="text-primary-yellow text-h4">
                SINCE 1995,
              </h4>
              <p className="mt-4 text-primary-white text-body">
                For more than twenty years, Samurai Elephant has stood as a space where creativity meets passion, Uniting artists and audiences through unforgettable stories on stage.
              </p>
              <p className="mt-4 text-primary-white text-body">
                Explore our <a className="underline">seating and venue layout ↗</a> to plan your perfect view.
              </p>
            </div>
          </div>


          {/* Location */}
           <div className="p-[2rem] sm:p-[3rem] lg:p-[5rem]">
            <h1 className="text-primary-yellow text-h1">
                FIND US HERE
            </h1>
            <div className="mt-4 flex flex-col sm:flex-col lg:flex-row gap-[2rem] sm:gap-[3rem] lg:gap-[5rem] justify-center items-center">
              <LocationPhoto/>
              <div className="lg:w-[40%]">
                <p className="text-primary-white text-body">
                  The Sumarai Elephant Studio theater is located in the heart of downtown Vancouver at 111 Hollywood Street.<br></br>
                  There are several parking lots within walking distance from the theatre in addition to meter parking on Daiki St. & Shin St.
                </p>
                <p className="mt-4 text-primary-white text-body">
                  Parking lot information, Easy Park: <a className="underline">www.easypark.ca ↗</a>
                </p>
              </div>
            </div>
          </div>
        </>
    )
}