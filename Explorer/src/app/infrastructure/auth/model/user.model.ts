export interface User {
    id: number;
    username: string;
    role: string;
    followers?: User[];
    notifications?: UserNotification[]; 
}
  
export interface UserNotification {
    notificationId?: number;
    senderId: number;
    message: string;
    status?: notificationStatus;
    timestamp?: Date;
}

export enum notificationStatus {
    Unread = 0,
    Read = 1
  }