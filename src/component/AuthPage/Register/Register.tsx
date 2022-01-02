import RegisterUser from "./RegisterUser";
import RegisterSchool from "./RegisterSchool";
import { useState } from "react";

const Register = () => {
  const [registerState, setRegisterState] = useState<"school" | "user">(
    "school"
  );

  interface RegisterInputType {
    username: string;
    password: string;
    email: string;
    admission_year: string;
    univ: string;
  }

  type RegisterKeyType =
    | "username"
    | "password"
    | "email"
    | "admission_year"
    | "univ";

  const [registerInput, setRegisterInput] = useState<RegisterInputType>({
    username: "",
    password: "",
    email: "",
    admission_year: "",
    univ: "",
  });

  const changeRegisterInput = (key: RegisterKeyType, input: string) => {
    setRegisterInput({ ...registerInput, [key]: input });
  };

  return (
    <section className="Register">
      {registerState === "school" ? (
        <RegisterSchool
          changeRegisterInput={changeRegisterInput}
          setRegisterState={setRegisterState}
        />
      ) : (
        <RegisterUser />
      )}
    </section>
  );
};

export default Register;
