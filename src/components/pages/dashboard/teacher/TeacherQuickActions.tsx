// components/dashboard/teacher/TeacherQuickActions.tsx
import Link from "next/link";

const TeacherQuickActions: React.FC = () => {
  const actions = [
    {
      name: "Create Exam",
      href: "/dashboard/exams/create",
      icon: "fas fa-file-alt",
      color: "blue",
    },
    {
      name: "Add Questions",
      href: "/dashboard/questions/create",
      icon: "fas fa-plus-circle",
      color: "green",
    },
    {
      name: "Mark Papers",
      href: "/dashboard/marking",
      icon: "fas fa-check-double",
      color: "purple",
    },
    {
      name: "Create Class",
      href: "/dashboard/classes/create",
      icon: "fas fa-users",
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

export default TeacherQuickActions;
