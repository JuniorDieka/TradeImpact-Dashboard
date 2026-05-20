export enum UserRole {
  ADMIN = 'admin',
  MSME_USER = 'msme_user',
  POLICY_ANALYST = 'policy_analyst',
  STAKEHOLDER = 'stakeholder'
}

export interface User {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  organization?: string;
  memberState?: string;
  sector?: string;
  isActive?: boolean;
  lastLogin?: Date;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}
