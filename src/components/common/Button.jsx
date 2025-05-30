export default function Button({ children, ...rest }) {
  return (
    <button
      {...rest}
      className="bg-sky-700 hover:bg-sky-800 text-white py-2 px-4 rounded-md"
    >
      {children}
    </button>
  );
}
