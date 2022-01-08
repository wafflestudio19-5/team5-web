import RegisterUser from "./RegisterUser";
import RegisterSchool from "./RegisterSchool";
import { useEffect, useState } from "react";
import {
  RegisterInputType,
  RegisterKeyType,
} from "../../../interface/interface";
import { postSignupAPI } from "../../../API/registerAPI";
import { useHistory } from "react-router-dom";

const Register = ({ socialLoginData }: { socialLoginData?: {} }) => {
  const history = useHistory();
  const [registerState, setRegisterState] = useState<"school" | "user">(
    "school"
  );
  const [isSocial, setIsSocial] = useState<boolean>(false);
  const [autoFillEmail, setAutoFillEmail] = useState<string | null>(null);

  const tryRegister = (input: RegisterInputType) => {
    postSignupAPI(input).then((res) => {
      if (res) {
        history.push("/");
      } else {
      }
    });
  };

  const [registerInput, setRegisterInput] = useState<RegisterInputType>({
    username: "",
    password1: "",
    password2: "",
    email: "",
    nickname: "",
    univ: "",
    admission_year: "",
  });

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
            socialLoginData={socialLoginData}
          />
        )}
      </form>
    </section>
  );
};

export default Register;
