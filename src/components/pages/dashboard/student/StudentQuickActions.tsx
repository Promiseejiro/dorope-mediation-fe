// components/dashboard/student/StudentQuickActions.tsx
import Link from "next/link";

const StudentQuickActions: React.FC = () => {
  const actions = [
    {
      name: "Practice Tests",
      href: "/dashboard/practice",
      icon: "fas fa-brain",
      color: "blue",
    },
    {
      name: "Study Materials",
      href: "/dashboard/materials",
      icon: "fas fa-book",
      color: "green",
    },
    {
      name: "My Profile",
      href: "/dashboard/profile",
      icon: "fas fa-user",
      color: "purple",
    },
    {
      name: "Help Center",
      href: "/dashboard/help",
      icon: "fas fa-question-circle",
      color: "orange",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Access</h3>
      <div className="grid grid-cols-2 gap-4">
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

export default StudentQuickActions;
