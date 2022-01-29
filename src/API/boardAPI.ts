import { authRequest } from "./API";
import { getErrorData } from "./errorHandling";

export const getBoardAPI = async () => {
  try {
    const response = await authRequest.get("/board/");
    return response.data;
  } catch (e) {
    return Promise.reject(e);
  }
};
