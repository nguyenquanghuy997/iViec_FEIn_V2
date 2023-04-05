import { DOMAIN_SERVER_API } from "@/config";
import { API_LOGIN, API_USER_INFO } from "@/routes/api";
// utils
import { _postApi } from "@/utils/axios";
import { setRefreshToken, setRememberMe, setSession } from "@/utils/jwt";
import axios from "axios";
import PropTypes from "prop-types";
import { createContext, useEffect, useReducer } from "react";
import jwtDecode from 'jwt-decode';

const initialState = {
  // Open authen gurad
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  permissions: [],
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user, permissions } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
      permissions,
    };
  },
  LOGIN: (state, action) => {
    const { user, permissions } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
      permissions,
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
    permissions: [],
  }),
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

const AuthContext = createContext({
  ...initialState,
  method: "jwt",
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
});

AuthProvider.propTypes = {
  children: PropTypes.node,
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = typeof window !== "undefined" ? localStorage.getItem("accessToken") : "";
        if (accessToken) {
          const user = await getUserInfoByToken(accessToken);
          setSession(accessToken);

          const { role: permissions = [] } = jwtDecode(accessToken) || {};

          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: true,
              user,
              permissions,
            },
          });

        } else {
          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: false,
              user: null,
              permissions: [],
            },
          });
        }
      } catch (err) {
        dispatch({
          type: "INITIALIZE",
          payload: {
            isAuthenticated: false,
            user: null,
            permissions: [],
          },
        });
      }
    };

    initialize();
  }, []);

  const getUserInfoByToken = async (token) => {
    const config = {
      method: "get",
      url: DOMAIN_SERVER_API + API_USER_INFO,
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    try {
      const user = await axios(config);
      return user.data;
    } catch (err) {
      throw err;
    }
  }

  const login = async (email, password, remember) => {

    var data = JSON.stringify({
      "userName": email,
      "password": password,
      "userLoginType":1
    });
    const response = await _postApi(API_LOGIN, data);
    const userData = await getUserInfoByToken(response.token);
    const { role: permissions = [] } = jwtDecode(response.token) || {};

    setRememberMe(remember);
    setSession(response.token);
    setRefreshToken(response.refreshToken);

    dispatch({
      type: "LOGIN",
      payload: {
        user: userData,
        permissions,
      },
    });
  };

  const logout = async () => {
    setRememberMe(null);
    setRefreshToken(null);
    setSession(null);

    dispatch({ type: "LOGOUT" });
  };

  const register = async () => {
    // TODO
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "jwt",
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
