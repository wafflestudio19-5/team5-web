interface AxiosError extends Error {
  response: { data: {}; headers: {} };
}

export const getErrorData = (inputError: unknown) => {
  const error = inputError as AxiosError;
  if (error?.response?.data) {
    return error.response.data;
  } else {
    return null;
  }
};

export const consoleLogAllError = (errorData: object | null) => {
  if (errorData) {
    for (const [key, value] of Object.entries(errorData)) {
      if (key === "non_field_errors") {
        console.log(`${value}`);
      } else {
        console.log(`${key}: ${value}`);
      }
    }
  } else {
    console.log("에러 없이 성공!");
  }
};
