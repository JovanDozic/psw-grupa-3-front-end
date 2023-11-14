export interface User {
    id: number;
    username: string;
    role: string;
    followers?: User[];
    notifications?: Notification[]; 
}
  
export interface Notification {
    notificationId: number;
    senderId: number;
    message: string;
    status: notificationStatus;
    timestamp: Date;
}

export enum notificationStatus {
    Unread = 0,
    Read = 1
  }