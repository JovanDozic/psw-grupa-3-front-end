export interface BlogComment {
    id?: number;
    userId: number;
    blogId: number;
    comment: string;
    timeCreated: Date;
    timeUpdated: Date;
}