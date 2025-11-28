// components/dashboard/admin/BillingOverview.tsx
const BillingOverview: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Billing Overview
      </h3>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">
              Current Plan
            </span>
            <span className="text-sm font-bold text-primary">Premium</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full"
              style={{ width: "75%" }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            75% of student capacity used
          </p>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Next Billing Date</span>
            <span className="text-sm font-medium text-gray-900">
              Jan 15, 2025
            </span>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-gray-600">Amount Due</span>
            <span className="text-sm font-bold text-green-600">$299.00</span>
          </div>
        </div>

        <button className="w-full bg-primary text-white py-2 px-3 rounded text-sm font-medium hover:bg-primary-dark transition-colors">
          Manage Subscription
        </button>
      </div>
    </div>
  );
};

export default BillingOverview;
