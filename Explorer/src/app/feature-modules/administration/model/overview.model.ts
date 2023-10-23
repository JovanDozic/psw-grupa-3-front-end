export interface Overview {
  Id: number;
  username: string; 
  email: string;     
  role: UserRole;    
  isSelected: boolean;
}
export enum UserRole {
  Guide = 'vodič',
  Tourist = 'turista',
  Administrator = 'administrator'
}
