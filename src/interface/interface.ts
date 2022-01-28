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
  board: { id: number; title: string };
  title_exist: boolean;
  writer: string;
  title: string;
  content: string;
  num_of_likes: number;
  num_of_scrap: number;
  num_of_comments: number;
  tags: any;
  profile_picture: string;
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
  title_exist: boolean;
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
  profile_picture: string;
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

export interface liveTopItemType {
  id: number;
  board: { id: number; title: string; title_exist: boolean };
  content: string;
  num_of_comments: number;
  num_of_likes: number;
  title: string;
}

export interface HotItemType {
  created_at: string;
  id: { id: number; title: string };
  title_content: string;
}

export interface UserType {
  admission_year: string;
  email: string;
  id: number;
  nickname: string;
  profile_picture: string;
  univ: string;
  username: string;
}

export interface UserPatchType {
  origin_password: string;
  nickname: string;
  new_password1: string;
  new_password2: string;
  email: string;
  profile_picture: string;
}

//timetable API
export interface TimeTableType {
  created_at: string;
  id: number;
  is_default: boolean;
  name: string;
  private: string;
  updated_at: string;
  lecture?: LectureScheduleType[];
}

export interface TimeTableSettingsType {
  name: string;
  private: string;
  is_default: boolean;
}
export interface LectureScheduleType {
  id: number;
  title: string;
  instructor: string;
  credits: number;
  lecture_time: LectureTimeType[];
}
export interface LectureType {
  id: number;
  lecture_time: LectureTimeType[];
  course: {
    title: string;
    instructor: string;
    rating: number;
  };
  classification: string;
  degree: string;
  grade: number;
  course_code: string;
  lecture_code: number;
  credits: number;
  lecture: number;
  laboratory: number;
  cart: number;
  quota: number;
  remark: null | any;
  semester: number;
}
export interface LectureTimeType {
  day: string;
  start: number;
  end: number;
  location: string;
}

export interface TimeTableSearchQueryType {
  semester: string;
  credits?: string;
  department?: string;
  title?: string;
  instructor?: string;
  course_code?: string;
  location?: string;
  ordering?: string;
}

export interface newLectureTimeType {
  day: string;
  startH: string;
  startM: string;
  endH: string;
  endM: string;
  location: string;
}

export interface newLectureType {
  title: string;
  instructor: string;
  time: newLectureTimeType[];
}

export interface newLectureRequestType {
  title: string;
  instructor: string;
  time: string[];
}

//Lecture에서 사용
export interface EvalType {
  id: number;
  course_id: number;
  course: string;
  rating: number;
  semester: string;
  content: string;
  is_mine: boolean;
  num_of_likes: number;
}

export interface myLectureType {
  id: number;
  instructor: string;
  is_evaluated: boolean;
  title: string;
}

export interface SearchedLectureType {
  id: number;
  title: string;
  instructor: string;
  rating: number;
}

export interface LectureInformationType {
  id: number;
  title: string;
  instructor: string;
  semester: string;
  sem_options: string[];
}

export interface LectureSummaryType {
  has_evals: boolean;
  rating: number;
  assignment: string;
  team: string;
  grade: string;
  attendance: string;
  exam_freq: string;
}

export interface myPointType {
  sum: number;
  details: pointHistoryType[];
}
export interface pointHistoryType {
  id: number;
  point: number;
  reason: string;
  created_at: string;
}

export default {};
