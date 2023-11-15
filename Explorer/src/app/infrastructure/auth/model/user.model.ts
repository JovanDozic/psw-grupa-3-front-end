export interface User {
    id: number;
    username: string;
    role: string;
    followers?: User[];
}
  