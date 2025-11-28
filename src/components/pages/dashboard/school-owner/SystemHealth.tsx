// components/dashboard/super-admin/SystemHealth.tsx
const SystemHealth: React.FC = () => {
  const systemMetrics = [
    { component: "API Server", status: "healthy", response: "45ms" },
    { component: "Database", status: "healthy", response: "12ms" },
    { component: "File Storage", status: "warning", response: "230ms" },
    { component: "Email Service", status: "healthy", response: "89ms" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "text-green-500";
      case "warning":
        return "text-yellow-500";
      case "error":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        System Health
      </h3>
      <div className="space-y-3">
        {systemMetrics.map((metric, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div
                className={`w-2 h-2 rounded-full ${getStatusColor(
                  metric.status
                ).replace("text-", "bg-")}`}
              ></div>
              <span className="text-sm font-medium text-gray-700">
                {metric.component}
              </span>
            </div>
            <div className="text-right">
              <span className="text-sm text-gray-600">{metric.response}</span>
              <span
                className={`text-xs ml-2 capitalize ${getStatusColor(
                  metric.status
                )}`}
              >
                {metric.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">System Uptime</span>
          <span className="font-medium text-green-600">99.97%</span>
        </div>
        <div className="flex justify-between items-center text-sm mt-2">
          <span className="text-gray-600">Active Sessions</span>
          <span className="font-medium text-gray-900">2,847</span>
        </div>
      </div>
    </div>
  );
};

export default SystemHealth;
