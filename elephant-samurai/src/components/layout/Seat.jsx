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
      className={`w-[34px] h-[38px] rounded-[4px] flex items-center justify-center font-medium transition ${StatusColor()}`}
    >
      {status === "sold" ? "X" : id}
    </button>
  );
}
