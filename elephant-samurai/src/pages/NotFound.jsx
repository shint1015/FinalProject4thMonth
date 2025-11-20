import errorPhoto from "@/assets/img/error.svg";
import { Link } from "@tanstack/react-router";

export default function notFound() {
    return (
        <div className="bg-primary-black my-[15%] text-primary-white flex flex-col items-center px-4 track-[0.03rem] relative">
            <img src={errorPhoto} alt="404 Not Found" className="w-1/2 max-w-[35%] absolute mt-[-8%] mb-4" />
            <h1 className="text-display text-primary-yellow relative mt-[4%]">404</h1>
            <p className="mt-[-0.5%] text-subtitle text-primary-yellow mb-[3%] ">Page Not Found</p>
            
            <p className="text-body mb-8 text-center">
                Sorry, We could’t find the page you were looking for
            </p>
            <Link href="/" className="text-subbody bg-primary-yellow text-primary-black px-[3.5%] py-3 rounded-md hover:bg-secondary-yellow transition">
                Back To Home
            </Link>
        </div>
    );
}