import { createContext, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
// utils
import { axiosAuth, axiosPublic } from 'Utils/axios';
import { useRouter } from 'next/router';
// ----------------------------------------------------------------------

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    debugger;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
  REFRESH_TOKEN: (state, action) => {
    const { isAuthenticated } = action.payload;
    debugger;
    return {
      ...state,
      isAuthenticated,
    };
  },
};

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

const AuthContext = createContext({
  ...initialState,
  method: 'jwt',
  login: () => Promise.resolve(),
  loginWithGoogle: () => Promise.resolve(),
  loginWithFaceBook: () => Promise.resolve(),
  loginWithTwitter: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
  request_refresh: () => Promise.resolve(),
});

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
  children: PropTypes.node,
};

function AuthProvider({ children, isAuthenticated }) {
  const [state, dispatch] = useReducer(reducer, { ...initialState, isAuthenticated });
  const { pathname } = useRouter();

  const login = async (email, password) => {
    const { data } = await axiosAuth.post('/api/auth/login', {
      email,
      password,
    });
    debugger;
    dispatch({
      type: 'INITIALIZE',
      payload: {
        user: {
          ...data,
          displayName: data.firstName + ' ' + data.lastName,
        },
        isAuthenticated: true,
      },
    });
  };

  const register = async (email, password, firstName, lastName, mobile) => {
    return await axiosPublic.post('/users/auth/register', {
      email,
      password,
      firstName,
      lastName,
      mobile,
    });
  };

  const logout = async () => {
    await axiosAuth.post('/api/auth/logout');
    debugger;
    dispatch({
      type: 'INITIALIZE',
      payload: { isAuthenticated: false, user: null },
    });
  };

  const request_refresh = async () => {
    try {
      await axiosAuth.get('/api/auth/refresh');
      debugger;
      dispatch({
        type: 'REFRESH_TOKEN',
        payload: {
          isAuthenticated: true,
        },
      });
    } catch (err) {
      console.error(err);
      debugger;
      dispatch({
        type: 'INITIALIZE',
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  };

  const userProfile = async () => {
    try {
      const { data } = await axiosAuth.get('/api/auth/user');
      dispatch({
        type: 'INITIALIZE',
        payload: {
          isAuthenticated: true,
          user: {
            ...data,
            displayName: data.firstName + data.lastName,
          },
        },
      });
    } catch (err) {
      console.error(err);
      debugger;
      dispatch({
        type: 'INITIALIZE',
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  };

  useEffect(() => {
    if (state?.isAuthenticated) {
      userProfile();
    }
  }, [state?.isAuthenticated]);

  useEffect(() => {
    if (state?.isAuthenticated) {
      request_refresh();
    }
  }, [pathname]);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        logout,
        register,
        request_refresh,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
