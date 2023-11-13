  export interface Blog {
    id?: number;
    title: string;
    description: string;
    creationDate: Date;
    status: BlogStatus;
    images: string[];
    userId: number;
    netVotes: number;
    ratings?: BlogRating[] | null;
    blogComments?: BlogComment[] | null;
  }
  

  
  export enum BlogStatus {
    DRAFT = 1,
    PUBLISHED,
    CLOSED,
    ACTIVE,
    FAMOUS,
  }
  
  export enum Vote {
    PLUS = 1,
    MINUS = 0,
  }
  
  export interface BlogComment {
    userId: number;
    blogId: number;
    comment: string;
    timeCreated: Date;
    timeUpdated: Date;
  }
  
  export interface BlogRating {
    userId: number;
    votingDate: Date;
    mark: Vote;
  }

  export function convertBlogStatusToString(status: BlogStatus): string {
    switch (status) {
      case BlogStatus.DRAFT:
        return 'Draft';
      case BlogStatus.PUBLISHED:
        return 'Published';
      case BlogStatus.CLOSED:
        return 'Closed';
      case BlogStatus.ACTIVE:
        return 'Active';
      case BlogStatus.FAMOUS:
        return 'Famous';
      default:
        return 'Unknown';
    }
}
