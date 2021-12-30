export const tempLoginToken = "Need Login" as const;

//액션 타입
const LOGIN = "authorization/LOGIN" as const;
const LOGOUT = "authorization/LOGOUT" as const;
const TEMPLOGIN = "authorization/TEMPLOGIN" as const;

//액션 생성함수
export const login = (loginData: string) => ({
  type: LOGIN,
  payload: loginData,
});

export const logout = () => ({
  type: LOGOUT,
});

export const tempLogin = () => ({
  type: TEMPLOGIN,
});

//액션과 상태의 타입
type AuthorizationAction =
  | ReturnType<typeof login>
  | ReturnType<typeof logout>
  | ReturnType<typeof tempLogin>;

type AuthorizationState = {
  token: null | string;
};

//초기 상태
const initialState: AuthorizationState = {
  token: null,
};

//리듀서
const authorization = (
  state: AuthorizationState = initialState,
  action: AuthorizationAction
) => {
  switch (action.type) {
    case LOGIN:
      return { token: action.payload };
    case LOGOUT:
      return initialState;
    case TEMPLOGIN:
      return { token: tempLoginToken };
    default:
      return state;
  }
};

export default authorization;
