import { useState, useEffect } from "react";

export default function CountDown({ startMinutes = 10 }) { // default is 10
  const [secondsLeft, setSecondsLeft] = useState(startMinutes * 60);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 0) {
          clearInterval(interval); // stop timer at 0
          return 0;
        }
        return prev - 1; // decrease 1 second per second
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <p className="text-title text-primary-white">
      {minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")} 
      {/* always show0:00 */}
    </p>
  );
}