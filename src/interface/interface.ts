//Login API
export interface TokenType {
  access: string | null;
  refresh: string | null;
}
export interface LoginInputType {
  username: string;
  password: string;
}

//Register API
export type RegisterKeyType =
  | "username"
  | "password1"
  | "password2"
  | "email"
  | "nickname"
  | "admission_year"
  | "univ";

export interface RegisterInputType {
  username: string;
  password1: string;
  password2: string;
  email: string;
  nickname: string;
  univ: string;
  admission_year: string;
}

export interface SocialRegisterInputType {
  social_id: string;
  provider: string;
  email: string;
  nickname: string;
  admission_year: string;
  univ: string;
}

//Board API
export interface boardItemType {
  anonym_enabled: boolean;
  board_type: number;
  created_at: string;
  description: string;
  id: number;
  is_market: boolean;
  manager: null | string;
  notice_enabled: boolean;
  question_enabled: boolean;
  title: string;
  title_enabled: boolean;
}

//Post API
export interface postItemType {
  id: string;
  writer: string;
  title: string;
  content: string;
  num_of_likes: number;
  num_of_scrap: number;
  num_of_comments: number;
  tags: any;
  images: string;
  is_anonymous: boolean;
  is_question: boolean;
  is_mine: boolean;
  created_at: string;
}

export interface postListType {
  count: number;
  next: string | null;
  previous: string | null;
  results: postItemType[] | [];
}

export interface postInputType {
  title: string;
  content: string;
  tags: string[];
  is_anonymous: boolean;
  is_question: boolean;
}

//Comment API
export interface CommentItemType {
  id: number;
  writer: string;
  content: string;
  created_at: string;
  profile: string;
  nickname: string;
  num_of_likes: number;
  is_mine: boolean;
  is_deleted: boolean;
  head_comment: number | null;
  user_type: string;
  replys: CommentItemType[];
}

export interface CommentInputType {
  content: string;
  is_anonymous: boolean;
  head_comment: number | null;
}

export default {};
