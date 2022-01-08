import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import qs from "qs";
import { plainRequest } from "../../../API/API";
import Register from "../Register/Register";
import { sendAuthCodeAPI } from "../../../API/loginAPI";
interface SocialParams {
  platform: string;
}

const Social = () => {
  const params: SocialParams = useParams();
  const platform = params.platform;
  const query = qs.parse(window.location.search.slice(1));
  const [socialLoginData, setSocialLoginData] = useState({});

  useEffect(() => {
    sendAuthCodeAPI(platform, query.code, query.state).then((response) => {
      setSocialLoginData(response);
    });
  });
  return <Register socialLoginData={socialLoginData}></Register>;
};

export default Social;
