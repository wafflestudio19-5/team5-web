import RegisterUser from "./RegisterUser";
import RegisterSchool from "./RegisterSchool";
import { useState } from "react";
import {
  RegisterInputType,
  RegisterKeyType,
} from "../../../interface/interface";
import { postSignupAPI } from "../../../API/registerAPI";
import { useHistory, useParams } from "react-router-dom";

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
  const [registerState, setRegisterState] = useState<"school" | "user">(
    "school"
  );

  const tryRegister = (input: RegisterInputType) => {
    postSignupAPI(input).then((res) => {
      if (res) {
        history.push("/");
      } else {
      }
    });
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
