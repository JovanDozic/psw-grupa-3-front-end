export interface Overview {
  Id: number;
  username: string;  // Match the case
  email: string;     // Match the case
  role: UserRole;    // Match the case
}
export enum UserRole {
  Guide = 'vodič',
  Tourist = 'turista',
  Administrator = 'administrator'
}
