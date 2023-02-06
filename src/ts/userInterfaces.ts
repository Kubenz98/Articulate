import { Post } from "./postInterfaces";

export interface User {
  profile_picture: string;
  userId: string;
  username: string;
}

export interface UserDetailsProps {
  profile_picture: string;
  username: string;
  posts: Post[];
}

export interface UserData {
  data: User;
}

export interface SignupUserData {
  email: string;
  password: string;
  passwordRepeat: string;
  nick: string;
  gender: string;
}

export interface UsersArr {
  data: User[];
}

export interface UsersObj {
  [key: string]: User;
}

export interface Username {
  name: string;
  exists: boolean
}

export interface UserAuth {
  email: string;
  password: string
}