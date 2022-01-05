interface AxiosError extends Error {
  response: { data: {}; headers: {} };
}

export const getErrorData = (inputError: unknown) => {
  const error = inputError as AxiosError;
  if (error.response.data) {
    return error.response.data;
  } else {
    return null;
  }
};
