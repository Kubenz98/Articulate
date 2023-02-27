export interface Comment {
  body: string;
  date: number;
  user?: string;
  uid?: string;
  id?: string;
}

export interface CommentsArr {
  data: Comment[];
}

export interface CommentsObj {
  [key: string]: Comment;
}
