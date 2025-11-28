// components/dashboard/admin/AdminQuickActions.tsx
import Link from "next/link";

const AdminQuickActions: React.FC = () => {
  const actions = [
    {
      name: "Add Teacher",
      href: "/dashboard/teachers/invite",
      icon: "fas fa-user-plus",
      color: "blue",
    },
    {
      name: "Create Exam",
      href: "/dashboard/exams/create",
      icon: "fas fa-file-alt",
      color: "green",
    },
    {
      name: "View Reports",
      href: "/dashboard/reports",
      icon: "fas fa-chart-bar",
      color: "purple",
    },
    {
      name: "School Settings",
      href: "/dashboard/settings",
      icon: "fas fa-cog",
      color: "orange",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Quick Actions
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {actions.map((action, index) => (
          <Link
            key={index}
            href={action.href}
            className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-primary hover:shadow-md transition-all duration-200"
          >
            <div
              className={`p-3 rounded-full bg-${action.color}-100 text-${action.color}-500 mb-2`}
            >
              <i className={`${action.icon} text-lg`}></i>
            </div>
            <span className="text-sm font-medium text-gray-700 text-center">
              {action.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminQuickActions;
