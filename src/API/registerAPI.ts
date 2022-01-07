import { RegisterInputType } from "../interface/interface";
import { plainRequest } from "./API";
import { consoleLogAllError, getErrorData } from "./errorHandling";

export const postSignupAPI = async (input: RegisterInputType) => {
  try {
    const response = await plainRequest.post("/user/signup/", input);
    return response;
  } catch (e) {
    consoleLogAllError(getErrorData(e));
  }
};
