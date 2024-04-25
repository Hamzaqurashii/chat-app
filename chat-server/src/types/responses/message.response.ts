export interface messageResponse {
  _id: string;
  roomId: string;
  sender: { text: string; senderId: string };
  isPrivate: boolean;
  createdAt?: string;
  updatedAt?: string;
}
