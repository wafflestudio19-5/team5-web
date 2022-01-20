import RegisterUser from "./RegisterUser";
import RegisterSchool from "./RegisterSchool";
import { useState } from "react";
import {
  RegisterInputType,
  RegisterKeyType,
} from "../../../interface/interface";
import { postSignupAPI } from "../../../API/registerAPI";
import { useHistory, useParams } from "react-router-dom";
import { toastErrorData } from "../../../API/errorHandling";
import { toast } from "../../Toast/ToastManager";
import { login } from "../../../redux/authorization";
import { saveToken } from "../../../function/localStorage";
import { useDispatch } from "react-redux";

const initialRegisterInput = {
  username: "",
  password1: "",
  password2: "",
  email: "",
  nickname: "",
  univ: "",
  admission_year: "",
};

const Register = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [registerState, setRegisterState] = useState<"school" | "user">(
    "school"
  );

  const tryRegister = (input: RegisterInputType) => {
    postSignupAPI(input).then(
      (token) => {
        toast.show({
          title: "회원가입",
          content: "성공하셨습니다",
          duration: 3000,
        });
        dispatch(login(token));
        saveToken(token);
        history.push("/");
      },
      (error) => {
        toastErrorData(error.response.data);
      }
    );
  };

  const [registerInput, setRegisterInput] =
    useState<RegisterInputType>(initialRegisterInput);

  const changeRegisterInput = (key: RegisterKeyType, input: string) => {
    setRegisterInput({ ...registerInput, [key]: input });
  };

  return (
    <section className="Register">
      <form
        className="Register__Form"
        onSubmit={(e) => {
          e.preventDefault();
          tryRegister(registerInput);
        }}
      >
        {registerState === "school" ? (
          <RegisterSchool
            changeRegisterInput={changeRegisterInput}
            registerInput={registerInput}
            setRegisterState={setRegisterState}
          />
        ) : (
          <RegisterUser
            changeRegisterInput={changeRegisterInput}
            registerInput={registerInput}
            setRegisterState={setRegisterState}
          />
        )}
      </form>
    </section>
  );
};

export default Register;
