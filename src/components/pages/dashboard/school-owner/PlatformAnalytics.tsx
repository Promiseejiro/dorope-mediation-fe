// components/dashboard/super-admin/PlatformAnalytics.tsx
const PlatformAnalytics: React.FC = () => {
  const analytics = [
    { metric: "Daily Active Users", value: "1,247", change: "+12%" },
    { metric: "Exam Completions", value: "845", change: "+8%" },
    { metric: "New Organizations", value: "3", change: "+15%" },
    { metric: "Average Session", value: "24min", change: "+5%" },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Platform Analytics
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {analytics.map((item, index) => (
          <div
            key={index}
            className="text-center p-4 border border-gray-200 rounded-lg"
          >
            <div className="text-2xl font-bold text-gray-900">{item.value}</div>
            <div className="text-sm text-gray-600 mb-1">{item.metric}</div>
            <div
              className={`text-xs font-medium ${
                item.change.startsWith("+") ? "text-green-600" : "text-red-600"
              }`}
            >
              {item.change} from last week
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlatformAnalytics;
