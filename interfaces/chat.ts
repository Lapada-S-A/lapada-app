export interface Chat {
  chat_id: number;
  users: number[];
  last_message: Message;
}

export interface Message {
  id?: number;
  chat_id: number;
  sender_id: number;
  content: string;
  date?: string;
}
