// components/dashboard/student/RecentResults.tsx
const RecentResults: React.FC = () => {
  const results = [
    { exam: "Physics Quiz", score: 88, date: "Today", improvement: "+5%" },
    {
      exam: "Chemistry Test",
      score: 76,
      date: "2 days ago",
      improvement: "-2%",
    },
    {
      exam: "Biology Assignment",
      score: 92,
      date: "1 week ago",
      improvement: "+8%",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Recent Results
      </h3>
      <div className="space-y-3">
        {results.map((result, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div>
              <p className="font-medium text-gray-900">{result.exam}</p>
              <p className="text-sm text-gray-500">{result.date}</p>
            </div>
            <div className="text-right">
              <span className="block font-bold text-gray-900">
                {result.score}%
              </span>
              <span
                className={`text-xs ${
                  result.improvement.startsWith("+")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {result.improvement}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentResults;
