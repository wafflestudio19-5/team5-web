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

export const consoleLogAllError = (input: {} | null) => {
  if (input) {
    for (const [key, value] of Object.entries(input)) {
      console.log(`${key}: ${value}`);
    }
  }
};
