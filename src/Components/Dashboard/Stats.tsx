const stats = [
  { value: "3", label: "Total post reactions" },
  { value: "0", label: "Total post comments" },
  { value: "< 500", label: "Total post views" },
];

export default function Stats() {
  return (
    <div className="flex gap-6">
      {stats.map(({ value, label }) => (
        <div key={label} className="flex-1 border
         bg-white border-gray-300 border-l-6 border-l-blue-400 hover:border-l-blue-700
          rounded-l-xl rounded-xl px-4 py-6 text-center">
          <h3 className="text-2xl font-semibold">{value}</h3>
          <p className="text-gray-600">{label}</p>
         </div>
      ))}
    </div>
  );
}
