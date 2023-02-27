export interface Post {
  title: string;
  tags: string;
  body: string;
  id?: string;
  date?: number;
  user?: string;
  uid?: string;
  imageLink: string;
}

export interface PostsArr {
  data: Post[];
}

export interface PostsObj {
  [key: string]: Post;
}

export interface WritePostFormData {
  title: string;
  tags: string;
  body: string;
  date: number;
  image: File;
}

