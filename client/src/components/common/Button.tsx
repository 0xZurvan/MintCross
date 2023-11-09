interface ButtonProps {
  title: string;
  className: string;
  onClick: () => void;
}

export default function Button({ title, className, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${className} bg-gray-dark border-2 border-gray-medium font-ibm font-semibold hover:text-opacity-80 text-purple p-4 rounded-lg`}
    >
      {title}
    </button>
  );
}
