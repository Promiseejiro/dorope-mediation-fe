// components/dashboard/admin/PendingApprovals.tsx
const PendingApprovals: React.FC = () => {
  const approvals = [
    { id: 1, type: "teacher", name: "Dr. Sarah Wilson", date: "2 hours ago" },
    { id: 2, type: "exam", name: "Biology Final Exam", date: "1 day ago" },
    { id: 3, type: "student", name: "New Student Batch", date: "2 days ago" },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Pending Approvals
        </h3>
        <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
          {approvals.length}
        </span>
      </div>
      <div className="space-y-3">
        {approvals.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
          >
            <div>
              <p className="font-medium text-gray-900">{item.name}</p>
              <p className="text-sm text-gray-500 capitalize">
                {item.type} • {item.date}
              </p>
            </div>
            <div className="flex space-x-2">
              <button className="p-1 text-green-600 hover:text-green-800">
                <i className="fas fa-check"></i>
              </button>
              <button className="p-1 text-red-600 hover:text-red-800">
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PendingApprovals;
