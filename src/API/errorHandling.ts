import { toast } from "../component/Toast/ToastManager";

export interface AxiosErrorType extends Error {
  response: {
    status: number;
    data: {
      non_field_errors?: string;
    };
    headers: {};
  };
}

export interface CustomizedErrorType {
  code: string;
  detail: string;
}

export interface AutoErrorType {
  username?: string;
  nickname?: string;
  password?: string;
  password1?: string;
  password2?: string;
  email?: string;
  univ?: string;
  admission_year?: string;
}

export const getErrorData = (inputError: unknown) => {
  const error = inputError as AxiosErrorType;
  if (error?.response?.data) {
    return error.response.data;
  } else {
    return null;
  }
};

export const consoleLogAllError = (input: {} | null) => {
  if (input) {
    for (const [key, value] of Object.entries(input)) {
      console.log(`${key}: ${value}`);
    }
  }
};

export const toastErrorData = (
  errorData: CustomizedErrorType | AutoErrorType
) => {
  if (errorData.hasOwnProperty("code")) {
    const data = errorData as CustomizedErrorType;
    toast.show({
      title: data.code,
      content: data.detail,
      duration: 3000,
    });
  } else {
    const data = errorData as object;
    for (const [key, value] of Object.entries(data)) {
      const title = translateKey(key);
      const content = translateValue(value);
      toast.show({
        title: title,
        content: String(content),
        duration: 5000,
      });
    }
  }
};

const engKey = [
  "username",
  "password",
  "password1",
  "password2",
  "email",
  "nickname",
  "admission_year",
  "univ",
  "title",
  "content",
  "semester",
  "This field may not be blank.",
  "Enter a valid email address.",
];

const korKey = [
  "아이디",
  "비밀번호",
  "비밀번호1",
  "비밀번호2",
  "이메일",
  "닉네임",
  "학번",
  "학교",
  "제목",
  "내용",
  "학기",
  "은(는) 필수 입력 항목입니다.",
  "유효한 주소를 입력하시기 바랍니다",
];

const translateKey = (key: string | any) => {
  const index = engKey.indexOf(key);
  if (index > -1) {
    return korKey[index];
  } else {
    return key;
  }
};

const translateValue = (value: string | any) => {
  if (Array.isArray(value)) {
    if (value.length > 0) {
      return translateKey(value[0]);
    } else {
      return "";
    }
  } else {
    return translateKey(value);
  }
};
