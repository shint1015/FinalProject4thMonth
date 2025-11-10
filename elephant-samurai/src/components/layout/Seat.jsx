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
      className={`w-[2.2rem] h-[2.5rem] rounded-[4px] flex items-center justify-center text-detail ${StatusColor()}`}
    >
      {status === "sold" ? "X" : id}
    </button>
  );
}
