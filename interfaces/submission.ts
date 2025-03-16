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
  documents: {
    id: number;
    name: string;
    pdfData: {
      type: string;
      data: Buffer;
    };
    createdAt: string;
    clientId: number;
    isIdentityDocument: boolean;
  }[];
}
