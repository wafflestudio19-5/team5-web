import { authRequest } from "./API";
import exp from "constants";

export const getMessageList = async () => {
  try {
    const response = await authRequest.get(`chat/list/`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const postMessage = async (
  msgType: string,
  id: number,
  input: FormData
) => {
  try {
    const response = await authRequest.post(
      `chat/?channel=${msgType}&${msgType}_id=${id}`,
      input
    );
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const getMessageDetail = async (id: number) => {
  try {
    const response = await authRequest.get(`chat/${id}`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
