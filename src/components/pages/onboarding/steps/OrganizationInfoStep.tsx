import { useState, useEffect } from "react";
import Input from "@/components/ui/Input";

interface OrganizationInfo {
  name: string;
  size: string;
  description?: string;
}

interface OrganizationInfoStepProps {
  organizationInfo?: OrganizationInfo;
  onUpdate: (info: OrganizationInfo) => void;
}

const OrganizationInfoStep: React.FC<OrganizationInfoStepProps> = ({
  organizationInfo,
  onUpdate,
}) => {
  const [formData, setFormData] = useState<OrganizationInfo>({
    name: organizationInfo?.name || "",
    size: organizationInfo?.size || "",
    description: organizationInfo?.description || "",
  });

  const organizationSizes = [
    "1-10 employees",
    "11-50 employees",
    "51-200 employees",
    "201-500 employees",
    "501-1000 employees",
    "1000+ employees",
  ];

  useEffect(() => {
    onUpdate(formData);
  }, [formData, onUpdate]);

  const handleInputChange = (field: keyof OrganizationInfo, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="fade-in max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Tell us about your organization
        </h2>
        <p className="text-gray-600">This helps us customize your experience</p>
      </div>

      <div className="space-y-6">
        <Input
          id="organization-name"
          label="Organization Name *"
          type="text"
          placeholder="Enter your organization name"
          value={formData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          className="mb-4"
        />

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Organization Size *
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {organizationSizes.map((size) => (
              <div
                key={size}
                onClick={() => handleInputChange("size", size)}
                className={`
                  border-2 rounded-lg p-4 cursor-pointer transition-all duration-200
                  ${
                    formData.size === size
                      ? "border-primary bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }
                  hover:transform hover:-translate-y-0.5
                `}
              >
                <div className="flex items-center">
                  <div
                    className={`
                    w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center
                    ${
                      formData.size === size
                        ? "border-primary bg-primary"
                        : "border-gray-300"
                    }
                  `}
                  >
                    {formData.size === size && (
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    )}
                  </div>
                  <span className="font-medium text-gray-800">{size}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Description (Optional)
          </label>
          <textarea
            id="description"
            rows={4}
            placeholder="Brief description of your organization..."
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
          />
        </div>

        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-sm text-primary">
            <strong>Why we ask:</strong> This information helps us personalize
            your dashboard and provide relevant assessment templates for your
            industry and organization size.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrganizationInfoStep;
