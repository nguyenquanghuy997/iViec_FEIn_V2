import { DOMAIN_SERVER_API, PERMISSIONS } from "@/config";
import { API_GET_COMPANY_INFOR, API_LOGIN, API_USER_INFO } from "@/routes/api";
// utils
import { _postApi } from "@/utils/axios";
import { setRefreshToken, setRememberMe, setSession } from "@/utils/jwt";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { decodeToken } from "jwt-js";
import PropTypes from "prop-types";
import { createContext, useEffect, useReducer } from "react";

const initialState = {
  user: null,
  company: null,
  permissions: [],
  isInitialized: false,
  isAuthenticated: false,
};

const handlers = {
  INITIALIZE: (state, action) => {
    const {...rest} = action.payload;
    return {
      ...state,
      ...rest,
      isInitialized: true,
    };
  },
  LOGIN: (state, action) => {
    const {...rest} = action.payload;
    return {
      ...state,
      ...rest,
      isAuthenticated: true,
    };
  },
  LOGOUT: (state) => ({
    ...state,
    user: null,
    company: null,
    permissions: [],
    isAuthenticated: false,
  }),
};

export const reducer = (state, action) =>
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

function AuthProvider({children}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken =
          typeof window !== "undefined"
            ? localStorage.getItem("accessToken")
            : "";
        if (accessToken) {
          const user = await getUserInfoByToken(accessToken);
          let tokenDecode = jwtDecode(accessToken) || {};
          
          let company = {};
          if (!tokenDecode["internal.perform"]) {
            company = await getCompanyInfoByToken(accessToken);
          }
          
          setSession(accessToken);
          
          let {role: permissions = []} = tokenDecode;
          if (!Array.isArray(permissions)) {
            permissions = [permissions];
          }
          // Is admin iviec
          if (tokenDecode["internal.perform"]) {
            permissions.push(PERMISSIONS.IVIEC_ADMIN);
          }
          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: true,
              user,
              company,
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
      return {
        ...user.data,
        organizationId: decodeToken(token).payload.ownerId,
      };
    } catch (err) {
      throw err;
    }
  };
  
  const getCompanyInfoByToken = async (token) => {
    const config = {
      method: "get",
      url: DOMAIN_SERVER_API + "/" + API_GET_COMPANY_INFOR,
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    
    try {
      const user = await axios(config);
      return {
        ...user.data,
      };
    } catch (err) {
      throw err;
    }
  };
  
  const login = async (email, password, remember) => {
    var data = JSON.stringify({
      userName: email,
      password: password,
      userLoginType: 1,
    });
    const {token, refreshToken} = await _postApi(API_LOGIN, data);
    const user = await getUserInfoByToken(token);
    let tokenDecode = jwtDecode(token) || {};
    
    let company = {};
    if (!tokenDecode["internal.perform"]) {
      company = await getCompanyInfoByToken(token);
    }
    
    let {role: permissions = []} = tokenDecode;
    if (!Array.isArray(permissions)) {
      permissions = [permissions];
    }
    // Is admin iviec
    if (tokenDecode["internal.perform"]) {
      permissions.push(PERMISSIONS.IVIEC_ADMIN);
    }
    
    setRememberMe(remember);
    setSession(token);
    setRefreshToken(refreshToken);
    
    dispatch({
      type: "LOGIN",
      payload: {
        user,
        company,
        permissions,
      },
    });
  };
  
  const logout = async () => {
    setRememberMe(null);
    setRefreshToken(null);
    setSession(null);
    
    dispatch({type: "LOGOUT"});
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
