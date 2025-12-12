"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { getUserRouteFromPermissions } from "@/lib/getUserRouteFromPermissions";
import { selectOrganization } from "@/request/organization";
import { useOrgStore } from "@/store/organizationStore";
import { Organization } from "@/types/organization";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { twMerge } from "tailwind-merge";

interface OrganizationSelectorProps {
  organizations: Organization[];
  isLoading?: boolean;
  userEmail?: string;
  className?: string;
}

const OrganizationSelector: React.FC<OrganizationSelectorProps> = ({
  organizations,
  isLoading = false,
  userEmail = "promiseejiro43@gmail.com",
  className = "",
}) => {
  const router = useRouter();
  const [filteredOrganizations, setFilteredOrganizations] =
    useState<Organization[]>(organizations);

  const { setOrganizationData } = useOrgStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrg, setSelectedOrg] = useState<string | null>(null);

  useEffect(() => {
    setFilteredOrganizations(organizations);
  }, [organizations]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredOrganizations(organizations);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = organizations.filter(
      (org) =>
        org.name.toLowerCase().includes(query) ||
        (org.description && org.description.toLowerCase().includes(query)) ||
        (org.domain && org.domain.toLowerCase().includes(query))
    );
    setFilteredOrganizations(filtered);
  }, [searchQuery, organizations]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const selectOrgMutation = useMutation({
    mutationFn: (orgId: string) => selectOrganization(orgId),
    onSuccess: (data) => {
      setOrganizationData(data);
      const route = getUserRouteFromPermissions(data.permissions);
      router.push(route);
    },
  });

  const handleSelectOrganization = (orgId: string) => {
    setSelectedOrg(orgId);
    selectOrgMutation.mutate(orgId);
  };

  const formatMemberCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k members`;
    }
    return `${count} ${count === 1 ? "member" : "members"}`;
  };

  return (
    <div className={twMerge("w-full max-w-2xl mx-auto bg-white", className)}>
      {/* Search and Create Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 fade-in">
        <div className="flex-1 relative">
          <i className="fas fa-search absolute left-2 top-6 transform -translate-y-1/2 text-gray-400 text-sm"></i>
          <Input
            id="search-organization"
            type="text"
            placeholder="Search for an organization by name, description, or domain..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-10"
          />
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className="absolute right-3 top-6 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <i className="fas fa-times text-sm"></i>
            </button>
          )}
        </div>
      </div>

      {/* Organizations List */}
      <div className="space-y-4">
        {isLoading ? (
          // Loading Skeleton
          Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="option-card border border-gray-200 rounded-xl p-6 animate-pulse"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-48"></div>
                    <div className="h-3 bg-gray-200 rounded w-32"></div>
                  </div>
                </div>
                <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
              </div>
            </div>
          ))
        ) : filteredOrganizations.length > 0 ? (
          <>
            <div className="mb-2">
              <h3 className="text-md font-bold text-gray-700 mb-3">
                YOUR ORGANIZATIONS ({filteredOrganizations.length})
              </h3>
              {filteredOrganizations.map((org) => (
                <div
                  key={org.id}
                  className={twMerge(
                    "option-card border border-gray-200 rounded-xl p-6 cursor-pointer transition-all duration-300 mb-4",
                    selectedOrg === org.id
                      ? "border-primary bg-primary/5 "
                      : "hover:border-primary/30 hover:bg-gray-50"
                  )}
                  onClick={() => handleSelectOrganization(org.id)}
                  onMouseEnter={() => setSelectedOrg(org.id)}
                  onMouseLeave={() => setSelectedOrg("")}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {/* Organization Logo/Icon */}
                      <div
                        className={twMerge(
                          "w-12 h-12 rounded-lg flex items-center justify-center transition-colors duration-300",
                          selectedOrg === org.id
                            ? "bg-primary text-white"
                            : "bg-gray-100 text-gray-600"
                        )}
                      >
                        {org.logo ? (
                          <img
                            src={org.logo}
                            alt={org.name}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <i className="fas fa-building text-xl"></i>
                        )}
                      </div>

                      {/* Organization Info */}
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-semibold text-foreground">
                            {org.name}
                          </h3>
                          {org.isActive && (
                            <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                              Active
                            </span>
                          )}
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                          {org.description && (
                            <p className="text-gray-600 text-sm flex items-center gap-1">
                              <i className="fas fa-info-circle text-xs"></i>
                              {org.description}
                            </p>
                          )}
                          <div className="flex items-center text-gray-500 text-sm">
                            <i className="fas fa-users text-sm mr-1"></i>
                            <span>{formatMemberCount(org.users.length)}</span>
                          </div>{" "}
                        </div>

                        <div className="mt-2 text-xs text-gray-400">
                          Created:{" "}
                          {new Date(org.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    {/* Selection Indicator */}
                    <div className={""}>
                      {selectedOrg === org.id && (
                        <span className="text-primary pr-2 font-medium">
                          Open
                        </span>
                      )}

                      <i
                        className={`fa fa-arrow-right ${
                          selectedOrg === org.id && "text-primary"
                        }`}
                        aria-hidden="true"
                      ></i>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          // No results found
          <div className="text-center py-12 fade-in">
            <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <i className="fas fa-search text-2xl text-gray-400"></i>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No organizations found
            </h3>
            <p className="text-gray-600 mb-4">
              {searchQuery
                ? `No organizations match your search for "${searchQuery}"`
                : "You don't have any organizations yet."}
            </p>

            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="mt-4 text-primary hover:text-secondary font-medium"
              >
                Clear search
              </button>
            )}
          </div>
        )}
      </div>

      {/* User Email Notice */}
      <div className="mt-12 pt-6 border-t border-gray-200 flex items-start flex-col">
        <p className="text-gray-600 text-sm">
          Logged in as: <span className="font-medium">{userEmail}</span>
        </p>
        <Button
          className="p-0 mt-2 text-primary hover:text-secondary text-sm font-medium"
          href="/login"
          variant="link"
        >
          <i className="fas fa-exchange-alt mr-1 text-xs"></i>
          Not you? Switch account
        </Button>
      </div>
    </div>
  );
};

export default OrganizationSelector;
