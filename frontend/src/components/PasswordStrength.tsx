 
const PasswordStrength = ({ level }: { level: number }) => {
  const colors = ["bg-red-500", "bg-yellow-500", "bg-green-600"];
  return (
    <div className="w-full h-2 mt-1 bg-gray-200 rounded">
      <div
        className={`h-2 rounded ${colors[level - 1] || "bg-gray-200"}`}
        style={{ width: `${level * 33}%` }}
      ></div>
    </div>
  );
};

export default PasswordStrength;
