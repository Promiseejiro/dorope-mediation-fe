import { axiosInstance } from "@/lib/axios"
import { CurrentOrganization, Organization, OrganizationFormData, } from "@/types/organization"

export const createOrganization = async (data: OrganizationFormData) => {
    const res = await axiosInstance.post('/organisation', {
        name: data.name,
        description: data.description,
        domain: data.domain
    })
    return res.data
}

export const getUserOrganizations = async (): Promise<Organization[] | []> => {
    const res = await axiosInstance.get<Organization[]>("/organisation");
    return res.data;
};


export const selectOrganization = async (organizationId: string): Promise<CurrentOrganization> => {
    const res = await axiosInstance.get<CurrentOrganization>(`/organisation/${organizationId}/access`);
    return res.data;
};