export default function Input({ type = 'text', label, error, ...rest }) {
  return (
    <div className="space-y-1">
      {label && <label className="block font-medium">{label}</label>}
      <input
        type={type}
        className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
        {...rest}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
