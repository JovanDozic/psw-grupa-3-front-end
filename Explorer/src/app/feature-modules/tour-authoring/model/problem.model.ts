export interface Problem {
    id?: number;
    category: string;
    priority: boolean;
    description: string;
    time: Date;
    tourId: number;
    touristId: number;
  }