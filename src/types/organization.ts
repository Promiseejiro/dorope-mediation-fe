import { Permission } from "./permission";

export interface Organization {
    id: string;
    name: string;
    description: string | null;
    domain: string | null;
    logo: string | null;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    users: any[];
    classes: any[];
    exams: any[];
}

export interface CreateOrganizationModalProps {
    onClose: () => void;
    isLoading?: boolean;
}

export interface OrganizationFormData {
    name: string;
    description: string;
    domain: string;
}

export interface Role {
    id: string;
    name: string;
}

export interface TimeRestriction {
    end: string;
    start: string;
}

export interface PolicyConditions {
    ipWhitelist: string[];
    timeRestriction: TimeRestriction;
}


export interface Policy {
    id: string;
    name: string;
    description: string;
    conditions: PolicyConditions;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    permissions: Permission[];
}

export interface CurrentOrganization {
    organisation: Organization;
    roles: Role[];
    policies: Policy[];
    permissions: Permission[];
}

