import { authRequest } from "./API";

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
