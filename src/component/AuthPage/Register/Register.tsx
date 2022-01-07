import RegisterUser from "./RegisterUser";
import RegisterSchool from "./RegisterSchool";
import { useState } from "react";
import {
  RegisterInputType,
  RegisterKeyType,
} from "../../../interface/interface";

const Register = () => {
  const [registerState, setRegisterState] = useState<"school" | "user">(
    "school"
  );

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
      <form className="Register__Form">
        {registerState === "school" ? (
          <RegisterSchool
            changeRegisterInput={changeRegisterInput}
            registerInput={registerInput}
            setRegisterState={setRegisterState}
          />
        ) : (
          <RegisterUser />
        )}
      </form>
    </section>
  );
};

export default Register;
