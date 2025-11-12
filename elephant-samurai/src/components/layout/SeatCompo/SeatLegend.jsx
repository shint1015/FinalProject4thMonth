export default function SeatLegend() {
  const legends = [
    { color: "bg-light-gray", label: "Available" },
    { color: "bg-dark-gray", label: "Sold" },
    { color: "bg-primary-yellow", label: "Selected" },
  ];

  return (
    <div className="flex justify-center gap-4 mt-6">
      {legends.map((item) => (
        <div key={item.label} className="flex items-center gap-2">
          <div className={`w-[1.5rem] h-[1.5rem] rounded-[4px] ${item.color}`} />
          <span className="text-detail text-primary-black">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
