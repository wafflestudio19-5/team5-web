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
      toast.show({
        title: key,
        content: String(value),
        duration: 3000,
      });
    }
  }
};
