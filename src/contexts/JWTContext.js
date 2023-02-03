import { DOMAIN_SERVER_API } from "@/config";
import { API_LOGIN, API_USER_INFO } from "@/routes/api";
// utils
import { _postApi } from "@/utils/axios";
import { setRefreshToken, setRememberMe, setSession } from "@/utils/jwt";
import axios from "axios";
import PropTypes from "prop-types";
import { createContext, useEffect, useReducer } from "react";

const initialState = {
  // Open authen gurad
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
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
  // const [cookies, setCookie, removeCookie] = useCookies([
  //   "access_token",
  //   "refresh_token",
  // ]);
  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken =
          typeof window !== "undefined"
            ? localStorage.getItem("accessToken")
            : "";

        if (accessToken) {
          // const user = await getUserInfo(accessToken);
          var data 
          var config = {
            method: "get",
            url: DOMAIN_SERVER_API + API_USER_INFO,
            headers: {
              Authorization: "Bearer " + accessToken,
            },
            data: data,
          };

          const user = await axios(config);
          setSession(accessToken);

          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: true,
              user,
            },
          });
        } else {
          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        dispatch({
          type: "INITIALIZE",
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const login = async (email, password, remember) => {

    var data = JSON.stringify({
      "userName": email,
      "password": password,
    });
    const response = await _postApi(API_LOGIN, data);
    console.log('response',response)
//     var myHeaders = new Headers();
// myHeaders.append("accept", "application/json");
// myHeaders.append("Content-Type", "application/json-patch+json");

// var raw = JSON.stringify({
//   "userName": "quy.vu.0101@gmail.com",
//   "password": "Abcd@2021"
// });

// var requestOptions = {
//   method: 'POST',
//   headers: myHeaders,
//   body: raw,
//   redirect: 'follow'
// };

// fetch("http://103.176.149.158:5001/api/identity/Identity/Login", requestOptions)
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));


    var config = {
      method: "get",
      url: DOMAIN_SERVER_API + API_USER_INFO,
      headers: {
        Authorization: "Bearer " + response.token,
      },
    };

    const user = await axios(config);
    console.log('data',data)
    const userData = user?.data?.Data;
    setRememberMe(remember);
    setSession(response.token);
    //set access_token to Cookie
    // let expires = new Date()
    // expires.setTime(expires.getTime() + (response.expires_in * 1000))
    // setCookie('access_token', response.access_token, { path: '/',  expires})

    dispatch({
      type: "LOGIN",
      payload: {
        userData,
      },
    });
  };

  const logout = async () => {
    setRememberMe(null);
    setRefreshToken(null);
    setSession(null);
    //delete access_token to Cookie
    // removeCookie('access_token', { path: '/'})

    dispatch({ type: "LOGOUT" });
  };

  const register = async () => {
    // TODO
  };

  // const getUserInfo = async (accessToken) => {
  //   const decoded = jwtDecode(accessToken);
  //   const {
  //     email,
  //     name: displayName = "",
  //     Role: { id: roleId, name: role } = {},
  //     Team = {},
  //     id: userId,
  //     linkAvatar,
  //   } = await _getApi(`${API_USER_INFO}/${decoded.userId}`);
  //   const { id: teamId, name: team } = Team || {};

  //   // return {
  //   //   email,
  //   //   displayName,
  //   //   role,
  //   //   roleId,
  //   //   userId,
  //   //   linkAvatar,
  //   //   team,
  //   //   teamId,
  //   // }
  //   // return {
  //   //   decoded,
  //   // };
  // };

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
