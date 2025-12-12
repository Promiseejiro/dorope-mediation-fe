import { Permission } from "@/types/permission";
export const getUserRouteFromPermissions = (permissions: Permission[]): string => {
    if (!permissions || permissions.length === 0) {
        return "/login";
    }
    const resources = new Set(
        permissions
            .map((p) => p.resource?.toLowerCase().trim())
            .filter(Boolean)
    );
    if (resources.has("*")) {
        return "/admin";
    }

    const hasAll = (needed: string[]) =>
        needed.every((item) => resources.has(item));

    const teacherResourceCombos = [
        ["exam", "classs", "assessment", "results"],
        ["exam", "class", "assessment", "results"],
    ];

    const isTeacher = teacherResourceCombos.some((combo) => hasAll(combo));

    if (isTeacher) {
        return "/teacher";
    }

    const studentResourceCombos = [
        ["exam", "assessment", "result"],
        ["exam", "assessment", "results"],
    ];
    const isStudent = studentResourceCombos.some((combo) => hasAll(combo));

    if (isStudent) {
        return "/student";
    }

    return "/login";
}
