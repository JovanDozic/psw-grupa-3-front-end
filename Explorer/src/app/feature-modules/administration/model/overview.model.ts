export interface Overview {
  userId: number;
  username: string; 
  email: string;     
  role: UserRole;    
  isSelected: boolean;
  coins?: number;
}
export enum UserRole {
  Guide = 'author',
  Tourist = 'tourist',
  Administrator = 'administrator'
}
