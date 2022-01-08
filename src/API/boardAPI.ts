import { authRequest } from "./API";
import { getErrorData } from "./errorHandling";

export const getBoardAPI = async () => {
  try {
    const response = await authRequest.get("/board/");
    console.log(response);
    return response.data;
  } catch (e) {
    console.log(getErrorData(e));
    return [];
  }
};
