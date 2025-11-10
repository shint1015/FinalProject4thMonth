import { useState } from "react";
import Seat from "./Seat";
import SeatLegend from './SeatLegend'

export default function SeatGrid() {
  const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "J"];
  const seatsPerRow = 12;

  const [selectedSeats, setSelectedSeats] = useState([]);

  const toggleSeat = (seatId) => {
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((s) => s !== seatId) // If selected remove from list if not add to it
        : [...prev, seatId]
    );
  };

  const TicketSold = (id) => ["A7", "D5", "E4"].includes(id); // sample of sold seats

  return (
    <div className="flex flex-col items-center justify-center bg-primary-white p-4">
        <div className="text-center mb-4 text-title border rounded-[4px] py-2 px-4 inline-block text-primary-black">Stage</div>
        {rows.map((row) => (
          <div key={row} className="flex justify-center my-[0.5rem] gap-[0.5rem]">
            {[...Array(seatsPerRow)].map((_, i) => { //loop every row
              const seatId = `${row}${i + 1}`; // return row name + number 
              const status = TicketSold(seatId)
                ? "sold"
                : selectedSeats.includes(seatId)
                ? "selected"
                : "available";
              return (
                <Seat
                  key={seatId}
                  id={seatId}
                  status={status}
                  onSelect={toggleSeat}
                />
              );
            })}
          </div>
        ))}
    <SeatLegend/>
    </div>
  );
}
