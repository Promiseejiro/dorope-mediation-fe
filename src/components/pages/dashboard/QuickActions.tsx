// components/dashboard/QuickActions.tsx
import Link from "next/link";

interface QuickActionsProps {
  userRole: string;
}

const QuickActions: React.FC<QuickActionsProps> = ({ userRole }) => {
  const adminActions = [
    {
      name: "Add Organization",
      href: "/dashboard/organizations/create",
      icon: "fas fa-building",
      color: "blue",
    },
    {
      name: "Invite Teacher",
      href: "/dashboard/teachers/invite",
      icon: "fas fa-user-plus",
      color: "green",
    },
    {
      name: "Create Exam",
      href: "/dashboard/exams/create",
      icon: "fas fa-file-alt",
      color: "purple",
    },
    {
      name: "View Reports",
      href: "/dashboard/reports",
      icon: "fas fa-chart-bar",
      color: "orange",
    },
  ];

  const teacherActions = [
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

  const studentActions = [
    {
      name: "View Exams",
      href: "/dashboard/exams",
      icon: "fas fa-file-alt",
      color: "blue",
    },
    {
      name: "My Results",
      href: "/dashboard/results",
      icon: "fas fa-award",
      color: "green",
    },
    {
      name: "Practice Tests",
      href: "/dashboard/practice",
      icon: "fas fa-brain",
      color: "purple",
    },
    {
      name: "Profile",
      href: "/dashboard/profile",
      icon: "fas fa-user",
      color: "orange",
    },
  ];

  const actions =
    userRole === "admin"
      ? adminActions
      : userRole === "teacher"
      ? teacherActions
      : studentActions;

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-100 text-blue-600",
      green: "bg-green-100 text-green-600",
      purple: "bg-purple-100 text-purple-600",
      orange: "bg-orange-100 text-orange-600",
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

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
            className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-primary hover:shadow-md transition-all duration-200 group"
          >
            <div
              className={`p-3 rounded-full ${getColorClasses(
                action.color
              )} mb-2 group-hover:scale-110 transition-transform`}
            >
              <i className={`${action.icon} text-lg`}></i>
            </div>
            <span className="text-sm font-medium text-gray-700 text-center group-hover:text-primary">
              {action.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
