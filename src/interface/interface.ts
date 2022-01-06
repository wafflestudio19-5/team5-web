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

export interface postItemType {
  id: number;
  board: string;
  writer: string;
  title: string;
  content: string;
  tags: [];
  images: [];
  is_anonymous: boolean;
  is_question: boolean;
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

export interface CommentItemType {
  id: number;
  writer: string;
  content: string;
  time: string;
  profile: string;
}

export default {};
