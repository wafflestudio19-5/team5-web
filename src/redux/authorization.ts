//액션 타입
const LOGIN = "authorization/LOGIN" as const;
const LOGOUT = "authorization/LOGOUT" as const;

export const login = (loginData: string) => ({
  type: LOGIN,
  payload: loginData,
});

export const logout = () => ({
  type: LOGOUT,
});

//액션과 상태의 타입
type AuthorizationAction = ReturnType<typeof login> | ReturnType<typeof logout>;

type AuthorizationState = {
  token: null | string;
};

const initialState: AuthorizationState = {
  token: null,
};

const authorization = (
  state: AuthorizationState = initialState,
  action: AuthorizationAction
) => {
  switch (action.type) {
    case LOGIN:
      return { token: action.payload };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default authorization;

//액션 생성함수
