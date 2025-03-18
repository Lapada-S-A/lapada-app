export interface Promotion {
  id: number;
  user: {
    id: number;
    username: string;
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