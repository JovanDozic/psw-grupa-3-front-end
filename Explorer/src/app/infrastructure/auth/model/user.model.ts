export interface User {
    id: number;
    username: string;
    role: string;
    followers?: User[];
    notifications?: Notification[]; 
}
  
export interface Notification {
    id?: number;
    senderId: number;
    message: string;
    notificationStatus: string;
    timestamp: Date;
}

export enum notificationStatus {
    Unread = 0,
    Read = 1
  }