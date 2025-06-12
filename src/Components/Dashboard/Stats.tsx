const stats = [
  { value: "3", label: "Total post reactions" },
  { value: "0", label: "Total post comments" },
  { value: "< 500", label: "Total post views" },
];

export default function Stats() {
  return (
    <div className="flex gap-6">
      {stats.map(({ value, label }) => (
        <div key={label} className="flex-1 border border-gray-300 rounded p-4 text-center">
          <h3 className="text-2xl font-semibold">{value}</h3>
          <p className="text-gray-600">{label}</p>
        </div>
      ))}
    </div>
  );
}
