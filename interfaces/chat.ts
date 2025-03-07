export interface Chat {
  id: number;
  users: { id: number; name: string }[];
  last_message: Message;
}

export interface Message {
  id: number;
  sender_id: number;
  content: string;
  date: string;
}
