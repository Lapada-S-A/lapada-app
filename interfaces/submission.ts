export interface Submission {
  id: number;
  user: {
    id: number;
    username: string;
  };
  category: {
    id: number;
    name: string;
  };
  documents: File[];
}
