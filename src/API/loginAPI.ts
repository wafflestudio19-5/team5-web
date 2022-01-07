import { authRequest, plainRequest } from "./API";
import { LoginInputType } from "../interface/interface";
import { login } from "../redux/authorization";
import { saveToken } from "../function/localStorage";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

export const postLoginAPI = async (input: LoginInputType) => {
  const dispatch = useDispatch();
  try {
    const response = await plainRequest.post("/user/login/", input);
    return response.data.token;
  } catch {}
};
