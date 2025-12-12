// store/orgStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
    Organization,
    Role,
    Policy,
    CurrentOrganization
} from '@/types/organization';
import { Permission } from '@/types/permission';

interface orgStore {
    organizationData: CurrentOrganization | null;
    setOrganizationData: (data: CurrentOrganization | null) => void;
    clearOrganizationData: () => void;
    getOrganizationData: () => {
        organization: Organization | null;
        roles: Role[];
        policies: Policy[];
        permissions: Permission[];
        organizationData: CurrentOrganization | null;
    };
}

export const useOrgStore = create<orgStore>()(
    persist(
        (set, get) => ({
            organizationData: null,
            setOrganizationData: (data) => {
                set({ organizationData: data });
            },

            clearOrganizationData: () => {
                set({ organizationData: null });
            },
            getOrganizationData: () => {
                const state = get();

                // const hasPermission = (resource: string, action: string): boolean => {
                //     const permissions = state.organizationData?.permissions || [];
                //     const hasWildcard = permissions.some(
                //         perm => perm.resource === '*' && perm.action === '*'
                //     );
                //     if (hasWildcard) return true;
                //     return permissions.some(
                //         perm =>
                //             (perm.resource === resource || perm.resource === '*') &&
                //             (perm.action === action || perm.action === '*')
                //     );
                // };

                // const hasRole = (roleName: string): boolean => {
                //     return state.organizationData?.roles?.some(role => role.name === roleName) || false;
                // };

                // const getActivePolicies = (): Policy[] => {
                //     return state.organizationData?.policies?.filter(policy => policy.isActive) || [];
                // };

                // const getOrganizationName = (): string => {
                //     return state.organizationData?.organisation?.name || '';
                // };
                return {
                    organization: state.organizationData?.organisation || null,
                    roles: state.organizationData?.roles || [],
                    policies: state.organizationData?.policies || [],
                    permissions: state.organizationData?.permissions || [],
                    organizationData: state.organizationData,
                    // hasPermission,
                    // hasRole,
                    // getActivePolicies,
                    // getOrganizationName,
                };
            },
        }),
        {
            name: 'organization-auth-storage',
            partialize: (state) => ({
                organizationData: state.organizationData,
            }),
        }
    )
);

