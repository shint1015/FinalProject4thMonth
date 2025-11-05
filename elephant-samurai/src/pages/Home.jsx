import HeroSectionVideo from "@/assets/video/HeroSection.mp4"
import Location from '@/assets/img/Location.png';

function LocationPhoto() {
  return <img src={Location} alt="Location" className="w-full"/>;
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
              <h1 className="mt-[-30px] text-primary-yellow font-text-display">
                ELEPHANT
              </h1>
              <p className="text-primary-yellow font-text-title">
                Studio Theatre
              </p>
            </div>
          </div>

          {/* Upcoming event */}
          <div className="p-[80px]">
            <h1 className="text-primary-yellow font-text-h1">
              UPCOMING EVENT
            </h1>

            {/* wait for Daiki part */}
          </div>

          {/* History */}
          <div className="relative w-full h-[550px] bg-cover bg-[image:var(--bg-history)] flex justify-center">
            <div className="w-[650px] p-[80px] flex justify-center flex-col text-center">
              <h4 className="text-primary-yellow font-text-h4">
                SINCE 1995,
              </h4>
              <p className="mt-4 text-primary-white">
                For more than twenty years, Samurai Elephant has stood as a space where creativity meets passion, Uniting artists and audiences through unforgettable stories on stage.
              </p>
              <p className="mt-4 text-primary-white">
                Explore our <a>seating and venue layout ↗</a> to plan your perfect view.
              </p>
            </div>
          </div>


          {/* Location */}
           <div className="p-[80px]">
            <h1 className="text-primary-yellow font-text-h1">
                FIND US HERE
            </h1>
            <div className="flex flex-row gap-[80px] w-[600px]">
              <img src="{LocationPhoto}"/>
              <div>
                <p className="text-primary-white">
                  The Sumarai Elephant Studio theater is located in the heart of downtown Vancouver at 111 Hollywood Street.
                  There are several parking lots within walking distance from the theatre in addition to meter parking on Daiki St. & Shin St.
                </p>
                <p className="mt-4 text-primary-white">
                  Parking lot information, Easy Park:<a>www.easypark.ca</a>
                </p>
              </div>
            </div>
          </div>
        </>
    )
}