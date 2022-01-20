import { useEffect, useMemo, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { sendAuthCodeAPI } from "../../../API/loginAPI";
import RegisterSocialUser from "../Register/RegisterSocialUser";
import {
  RegisterKeyType,
  SocialRegisterInputType,
} from "../../../interface/interface";
import { postSocialSignupAPI } from "../../../API/registerAPI";
import { toast } from "../../Toast/ToastManager";
import { login } from "../../../redux/authorization";
import { saveToken } from "../../../function/localStorage";
import { useDispatch } from "react-redux";
import { toastErrorData } from "../../../API/errorHandling";
interface SocialParams {
  platform: string;
}

const initialSocialRegisterInput = {
  social_id: "",
  provider: "",
  email: "",
  nickname: "",
  admission_year: "",
  univ: "",
};

const Social = () => {
  const params: SocialParams = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const platform = params.platform;
  const [socialLoginData, setSocialLoginData] = useState({
    email: "",
    login: false,
    provider: "",
    social_id: "",
    token: { access: null, refresh: null },
  });
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const [socialRegisterInput, setSocialRegisterInput] =
    useState<SocialRegisterInputType>(initialSocialRegisterInput);

  const trySocialRegister = (input: SocialRegisterInputType) => {
    postSocialSignupAPI(input).then(
      (token) => {
        toast.show({
          title: "소셜 회원가입",
          content: "성공했습니다",
          duration: 3000,
        });
        dispatch(token);
        saveToken(token);
        history.push("/");
      },
      (error) => {
        toastErrorData(error.response.data);
      }
    );
  };

  const changeSocialRegisterInput = (key: RegisterKeyType, input: string) => {
    setSocialRegisterInput({ ...socialRegisterInput, [key]: input });
  };

  useEffect(() => {
    if (query.has("state")) {
      sendAuthCodeAPI(platform, query.get("code"), query.get("state")).then(
        (response) => {
          setSocialLoginData(response);
        }
      );
    } else {
      sendAuthCodeAPI(platform, query.get("code")).then((response) => {
        setSocialLoginData(response);
      });
    }
  }, []);

  useEffect(() => {
    if (socialLoginData.login) {
      console.log("로그인!!!");
      console.log(socialLoginData);
      const token = socialLoginData.token;
      dispatch(login(token));
      saveToken(token);
      history.push("/");
      console.log("로그인 성공!!!");
    } else {
      const newInput = {
        ...socialRegisterInput,
        social_id: socialLoginData.social_id,
        provider: socialLoginData.provider,
        email: socialLoginData.email,
      };
      console.log(newInput);
      setSocialRegisterInput(newInput);
    }
  }, [socialLoginData]);

  return (
    <section className="Register">
      <form
        className="Register__Form"
        onSubmit={(e) => {
          e.preventDefault();
          trySocialRegister(socialRegisterInput);
        }}
      >
        <RegisterSocialUser
          changeSocialRegisterInput={changeSocialRegisterInput}
          socialRegisterInput={socialRegisterInput}
          disableEmail={socialLoginData.email !== ""}
        />
      </form>
    </section>
  );
};

export default Social;
