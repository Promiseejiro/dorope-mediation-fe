"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import OrganizationSelector from "@/components/pages/organization/OrganizationSelector";
import CreateOrganizationModal from "@/components/pages/organization/CreateOrganizationModal";
import Button from "@/components/ui/Button";
import AnimatedModalLayout from "@/components/layout/animatedModalLayout";
import { useQuery } from "@tanstack/react-query";
import { getUserOrganizations } from "@/request/organization";
import { getSession, useSession } from "next-auth/react";

export default function SelectOrganizationPage() {
  const { data: session, status } = useSession();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const router = useRouter();

  const { data: organizations, isPending } = useQuery({
    queryKey: ["fetch-organizations"],
    queryFn: getUserOrganizations,
    initialData: [],
  });

  const handleSelectOrganization = (orgId: string) => {
    localStorage.setItem("selectedOrganizationId", orgId);
    const selectedOrg = organizations.find((org) => org.id === orgId);
    if (selectedOrg) {
      setTimeout(() => {
        router.push("/dashboard");
      }, 500);
    }
  };

  const handleCreateOrganizationClick = () => {
    setShowCreateModal(true);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col mt-22">
      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
        {/* Welcome Back Message with Create CTA */}
        <div className="max-w-4xl mx-auto mb-8 fade-in">
          <div className="flex flex-col gap-4 items-start justify-between">
            <div>
              <h2 className="text-5xl font-bold text-foreground">
                Welcome back!
              </h2>
              <p className="text-gray-600 text-lg mt-1">
                Choose a organization below to get back to working with your
                team.
              </p>
            </div>

            <div className="max-w-4xl mx-auto mb-8 p-6 bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/20 rounded-2xl fade-in">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <i className="fas fa-magic text-xl text-primary"></i>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">
                    Create new organization
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    Start by creating an organization to manage your team,
                    projects, and collaborations.
                  </p>
                </div>
                <Button
                  onClick={handleCreateOrganizationClick}
                  variant="primary"
                  size="md"
                  className="flex items-center justify-center gap-2"
                >
                  <i className="fas fa-magic text-sm"></i>
                  Create New Organization
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center py-4">
          <span className="bg-white w-10 h-10 rounded-full flex items-center justify-center text-primary font-bold">
            OR
          </span>
        </div>
        <OrganizationSelector
          organizations={organizations}
          isLoading={isPending}
          userEmail={session?.user?.email}
        />
      </main>
      {showCreateModal && (
        <AnimatedModalLayout>
          <CreateOrganizationModal onClose={() => setShowCreateModal(false)} />
        </AnimatedModalLayout>
      )}

      {/* Footer */}
      <footer className="border-t border-gray-200 py-4 px-6 text-center">
        <p className="text-sm text-gray-500">
          <i className="fas fa-question-circle mr-1 text-xs"></i>
          Need help?{" "}
          <a href="#" className="text-primary hover:text-secondary">
            Contact support
          </a>
        </p>
      </footer>
    </div>
  );
}
