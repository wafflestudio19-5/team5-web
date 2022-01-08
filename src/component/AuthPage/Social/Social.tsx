import { useEffect } from "react";
import { useParams } from "react-router-dom";
import qs from "qs";
import { plainRequest } from "../../../API/API";
interface SocialParams {
  platform: string;
}

const Social = () => {
  const params: SocialParams = useParams();
  const platform = params.platform;
  const query = qs.parse(window.location.search.slice(1));
  console.dir(query);

  useEffect(() => {
    plainRequest
      .post(`/user/${platform}/login/callback/`, {
        code: query.code,
        state: query.state,
      })
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  }, []);
  return <div>소셜 로그인 페이지입니다</div>;
};

export default Social;
