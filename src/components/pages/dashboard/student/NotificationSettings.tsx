"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import GoBack from "@/components/ui/GoBack";

interface NotificationSettings {
  email: {
    examReminders: boolean;
    resultNotifications: boolean;
    announcement: boolean;
    securityAlerts: boolean;
    weeklySummary: boolean;
  };
  push: {
    examReminders: boolean;
    resultNotifications: boolean;
    announcement: boolean;
    classUpdates: boolean;
  };
  sms: {
    examReminders: boolean;
    urgentAlerts: boolean;
  };
}

const NotificationSettings: React.FC = () => {
  const [settings, setSettings] = useState<NotificationSettings>({
    email: {
      examReminders: true,
      resultNotifications: true,
      announcement: true,
      securityAlerts: true,
      weeklySummary: false,
    },
    push: {
      examReminders: true,
      resultNotifications: true,
      announcement: false,
      classUpdates: true,
    },
    sms: {
      examReminders: false,
      urgentAlerts: true,
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleToggle = (
    category: keyof NotificationSettings,
    setting: string,
    value: boolean
  ) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value,
      },
    }));
    setIsSaved(false);
  };

  const handleSave = async () => {
    setIsLoading(true);

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Settings saved:", settings);
      setIsSaved(true);
    } catch (error) {
      console.error("Error saving settings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSettings({
      email: {
        examReminders: true,
        resultNotifications: true,
        announcement: true,
        securityAlerts: true,
        weeklySummary: false,
      },
      push: {
        examReminders: true,
        resultNotifications: true,
        announcement: false,
        classUpdates: true,
      },
      sms: {
        examReminders: false,
        urgentAlerts: true,
      },
    });
    setIsSaved(false);
  };

  const NotificationCategory = ({
    title,
    description,
    icon,
    children,
  }: {
    title: string;
    description: string;
    icon: string;
    children: React.ReactNode;
  }) => (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-start space-x-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-lg">
          <i className={`fas ${icon} text-blue-600`}></i>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );

  const NotificationToggle = ({
    label,
    description,
    checked,
    onChange,
  }: {
    label: string;
    description: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
  }) => (
    <div className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0">
      <div className="flex-1">
        <p className="font-medium text-gray-900">{label}</p>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div
          className={`w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer transition-colors ${
            checked ? "bg-green-500" : "bg-gray-300"
          }`}
        ></div>
        <div
          className={`absolute left-0.5 top-0.5 bg-white border border-gray-300 rounded-full h-5 w-5 transition-transform ${
            checked ? "transform translate-x-5" : ""
          }`}
        ></div>
      </label>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <GoBack fallbackUrl="/student/profile" className="px-0" />

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Notification Settings
          </h1>
          <p className="text-gray-600">
            Manage how you receive notifications and alerts
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={handleReset}>
            Reset to Default
          </Button>
          <Button variant="primary" onClick={handleSave} disabled={isLoading}>
            {isLoading ? (
              <>
                <i className="fas fa-spinner fa-spin mr-2"></i>
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </div>

      {isSaved && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center space-x-2 text-green-800">
            <i className="fas fa-check-circle"></i>
            <span className="font-medium">
              Notification settings updated successfully!
            </span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Email Notifications */}
        <NotificationCategory
          title="Email Notifications"
          description="Receive important updates via email"
          icon="fa-envelope"
        >
          <NotificationToggle
            label="Exam Reminders"
            description="Get reminded about upcoming exams 24 hours before they start"
            checked={settings.email.examReminders}
            onChange={(checked) =>
              handleToggle("email", "examReminders", checked)
            }
          />
          <NotificationToggle
            label="Result Notifications"
            description="Receive email when exam results are published"
            checked={settings.email.resultNotifications}
            onChange={(checked) =>
              handleToggle("email", "resultNotifications", checked)
            }
          />
          <NotificationToggle
            label="Announcements"
            description="Important announcements from your institution"
            checked={settings.email.announcement}
            onChange={(checked) =>
              handleToggle("email", "announcement", checked)
            }
          />
          <NotificationToggle
            label="Security Alerts"
            description="Important security and account-related notifications"
            checked={settings.email.securityAlerts}
            onChange={(checked) =>
              handleToggle("email", "securityAlerts", checked)
            }
          />
          <NotificationToggle
            label="Weekly Summary"
            description="Weekly report of your academic progress"
            checked={settings.email.weeklySummary}
            onChange={(checked) =>
              handleToggle("email", "weeklySummary", checked)
            }
          />
        </NotificationCategory>

        {/* Push Notifications */}
        {/* <NotificationCategory
          title="Push Notifications"
          description="Instant notifications on your device"
          icon="fa-bell"
        >
          <NotificationToggle
            label="Exam Reminders"
            description="Reminders for upcoming exams and deadlines"
            checked={settings.push.examReminders}
            onChange={(checked) =>
              handleToggle("push", "examReminders", checked)
            }
          />
          <NotificationToggle
            label="Result Notifications"
            description="Get notified immediately when results are available"
            checked={settings.push.resultNotifications}
            onChange={(checked) =>
              handleToggle("push", "resultNotifications", checked)
            }
          />
          <NotificationToggle
            label="Announcements"
            description="Instant alerts for important announcements"
            checked={settings.push.announcement}
            onChange={(checked) =>
              handleToggle("push", "announcement", checked)
            }
          />
          <NotificationToggle
            label="Class Updates"
            description="Updates about class schedules and materials"
            checked={settings.push.classUpdates}
            onChange={(checked) =>
              handleToggle("push", "classUpdates", checked)
            }
          />
        </NotificationCategory> */}

        {/* SMS Notifications */}
        <NotificationCategory
          title="SMS Notifications"
          description="Text message alerts for urgent matters"
          icon="fa-comment-alt"
        >
          <NotificationToggle
            label="Exam Reminders"
            description="SMS reminders for critical exam deadlines"
            checked={settings.sms.examReminders}
            onChange={(checked) =>
              handleToggle("sms", "examReminders", checked)
            }
          />
          <NotificationToggle
            label="Urgent Alerts"
            description="Critical alerts that require immediate attention"
            checked={settings.sms.urgentAlerts}
            onChange={(checked) => handleToggle("sms", "urgentAlerts", checked)}
          />
        </NotificationCategory>

        {/* Notification Preferences */}
        {/* <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-start space-x-3 mb-6">
            <div className="p-2 bg-purple-100 rounded-lg">
              <i className="fas fa-sliders-h text-purple-600"></i>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Notification Preferences
              </h3>
              <p className="text-gray-600">
                Customize your notification experience
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <div className="flex-1">
                <p className="font-medium text-gray-900">Quiet Hours</p>
                <p className="text-sm text-gray-600 mt-1">
                  Mute notifications during specified hours
                </p>
              </div>
              <Button variant="outline" size="sm">
                Configure
              </Button>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <div className="flex-1">
                <p className="font-medium text-gray-900">Notification Sound</p>
                <p className="text-sm text-gray-600 mt-1">
                  Choose alert sound for push notifications
                </p>
              </div>
              <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                <option>Default</option>
                <option>Gentle</option>
                <option>Urgent</option>
                <option>None</option>
              </select>
            </div>

            <div className="flex items-center justify-between py-3">
              <div className="flex-1">
                <p className="font-medium text-gray-900">Vibration</p>
                <p className="text-sm text-gray-600 mt-1">
                  Enable vibration for mobile notifications
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  defaultChecked
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer transition-colors peer-checked:bg-green-500"></div>
                <div className="absolute left-0.5 top-0.5 bg-white border border-gray-300 rounded-full h-5 w-5 transition-transform peer-checked:transform peer-checked:translate-x-5"></div>
              </label>
            </div>
          </div>
        </div> */}
      </div>

      {/* Notification Summary */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <i className="fas fa-info-circle text-blue-600 mt-0.5"></i>
          <div>
            <h4 className="font-semibold text-blue-800 mb-2">
              Notification Summary
            </h4>
            <p className="text-sm text-blue-700 mb-3">
              Based on your current settings, you will receive:
            </p>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Email notifications for exam reminders and results</li>
              <li>• Push notifications for instant updates</li>
              <li>• SMS alerts for urgent matters only</li>
              <li>• Weekly progress reports via email</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
