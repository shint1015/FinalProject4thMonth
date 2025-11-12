export default function Seat({ id, status, onSelect }) {
  const StatusColor = () => {
    switch (status) {
      case "sold":
        return "bg-dark-gray text-light-gray cursor-not-allowed";
      case "selected":
        return "bg-primary-yellow text-primary-black";
      default:
        return "bg-light-gray text-primary-black hover:bg-dark-gray";
    }
  };

  return (
    <button
      onClick={() => onSelect(id)}
      disabled={status === "sold"}
      className={`w-7 h-9 sm:w-8 sm:h-10 lg:w-10 lg:h-12 rounded-[4px] flex items-center justify-center text-[0.75rem] ${StatusColor()}`}
    >
      {status === "sold" ? "X" : id}
    </button>
  );
}
