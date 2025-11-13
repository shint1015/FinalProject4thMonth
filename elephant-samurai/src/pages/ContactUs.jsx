import { useState } from "react";
import Plus from '@/assets/icon/plus.svg';
import Minus from '@/assets/icon/Minus.svg';
import Facebook from '@/assets/icon/FacebookLogo_white.svg';
import Ig from '@/assets/icon/InstagramLogo_white.svg';
import Tiktok from '@/assets/icon/TiktokLogo_white.svg';
import Xtwitter from '@/assets/icon/XLogo_white.svg';

export default function ContactUS() {
  const faqs = [
    {
      question: "How can I purchase tickets for a show?",
      answer: "Tickets can be purchased directly through our official website or at the theatre box office during operating hours. We recommend booking early to secure your preferred seats.",
    },
    {
      question: "What time should I arrive before a performance?",
      answer: "We recommend arriving at least 20 minutes before the show starts to allow time for seating and any necessary preparations.",
    },
    {
      question: "Are food and drinks allowed inside the theatre?",
      answer: "Outside food and drinks are not permitted, but refreshments are available for purchase in the lobby before and after performances.",
    },
    {
      question: "Is the theatre wheelchair accessible?",
      answer: "Yes, the theatre provides full wheelchair access and reserved seating for accessibility needs.",
    },
    {
      question: "Can I exchange or refund my ticket?",
      answer: "Tickets are non-refundable, but exchanges can be made up to 24 hours before the show time depending on availability.",
    },
    {
      question: "What age group is the show suitable for?",
      answer: "Most shows are suitable for all ages unless otherwise specified. Please check the show details for recommendations.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <h1 className="mt-8 text-primary-yellow text-h1 px-[2rem] sm:px-[3rem] lg:px-[5rem]">
        CONTACT US
      </h1>

      <div className="mt-4 px-[2rem] sm:px-[3rem] lg:px-[5rem] gap-[3rem] sm:gap-[3rem] lg:gap-[5rem] flex flex-col sm:flex-col lg:flex-row">
        {/* FAQ */}
        <div className="lg:w-[70%]">
          <p className="text-primary-yellow text-title">FAQ</p>

          <div className="divide-y divide-primary-white">
            {faqs.map((faq, i) => (
              <div key={i} className="py-4">
                <button onClick={() => toggleFAQ(i)} className="w-full text-left text-primary-white text-body flex justify-between items-center">
                  {faq.question}
                  <img src={openIndex === i ? Minus : Plus} alt={openIndex === i ? "close" : "open"} className="w-6"/>
                </button>
                
                {openIndex === i && (
                    <p className="mt-2 text-dark-gray text-detail">
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* contact */}
        <div className="lg:w-[30%] w-full mb-[5rem]">
            <p className="text-primary-yellow text-title">Contact Us</p>

            <form className="mt-4 flex flex-col gap-[1rem]">
                <input type="text" placeholder="Name" className="bg-primary-white border-none placeholder-dark-grey text-black text-subbody focus:outline-none p-[1rem] rounded"/>
                <input type="text" placeholder="Email" className="bg-primary-white border-none placeholder-dark-grey text-black text-subbody focus:outline-none p-[1rem] rounded"/>
                <input type="text" placeholder="Message" className="bg-primary-white border-none placeholder-dark-grey text-black text-subbody focus:outline-none p-[1rem] rounded"/>
                <button className="bg-primary-yellow text-black py-3 px-6 mt-4 rounded hover:bg-secondary-yellow text-subbody">Send</button>
            </form>

            <div className="mt-4 flex flex-row gap-[0.5rem] lg:gap-[0.75rem]">
                <img src={Facebook} alt="Facebook" className="w-[1rem] lg:w-[1.5rem]"/>
                <img src={Ig} alt="Instagram" className="w-[1rem] lg:w-[1.5rem]"/>
                <img src={Tiktok} alt="Tiktok" className="w-[1rem] lg:w-[1.5rem]"/>
                <img src={Xtwitter} alt="X" className="w-[1rem] lg:w-[1.5rem]"/>
            </div>
            <p className="mt-1 text-primary-white text-detail">+1(778)- 000-0000</p>
            <p className="text-primary-white text-detail">info@samuraielephant.com</p>
        </div>
      </div>

    </>
  );
}
