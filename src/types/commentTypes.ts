
export interface CommentPayload {
  username: string;
  content: string;
  postId: string;
  userId: string;
  updatedAt?: string | null;
}

 export interface Comment {
  _id: string;
  username:string
  content: string;
  postId: string;
  userId: string;
  updatedAt?: string | null;
  createdAt: string;
}