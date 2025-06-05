export default function Button({ children, ...rest }) {
  return (
    <button
      {...rest}
      className="bg-purple-700 hover:bg-purple-800 text-white py-2 px-4 rounded-md active:bg-purple-900 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
    >
      {children}
    </button>
  );
}
