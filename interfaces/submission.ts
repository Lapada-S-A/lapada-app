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
  createdAt: string;
  documents: {
    id: number;
    name: string;
    pdfData: {
      type: string;
      data: Buffer;
    };
    clientId: number;
    isIdentityDocument: boolean;
  }[];
}
