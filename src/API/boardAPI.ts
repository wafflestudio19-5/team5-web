import { authRequest } from "./API";
import { getErrorData } from "./ErrorHandling";

export const getBoard = async () => {
  try {
    const response = await authRequest.get("/board/");
    return response.data;
  } catch (e) {
    console.log(getErrorData(e));
    return [];
  }
};
