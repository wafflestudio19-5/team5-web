export interface AxiosErrorType extends Error {
  response: {
    status: number;
    data: {
      non_field_errors?: string;
    };
    headers: {};
  };
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
