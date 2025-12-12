// /types/invite-user.ts
export interface InvitedUser {
  id: string;
  email: string;
  role: 'teacher' | 'org-admin' | 'student' | 'Teacher' | 'Organization Admin' | 'Student';
  organization: string;
  status: 'pending' | 'sent' | 'accepted' | 'expired';
  invitedAt: string;
  invitedBy: string;
  customMessage?: string;
}

export interface InviteFormValues {
  email: string;
  role: 'teacher' | 'org-admin' | 'student';
  organization: string;
  customMessage: string;

  bulkEmails: string;
  bulkRole: 'teacher' | 'org-admin' | 'student';
  bulkOrganization: string;
}

export interface InviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'create' | 'edit';
  initialData?: InvitedUser;
  onSubmit: (data: any) => Promise<void>;
}