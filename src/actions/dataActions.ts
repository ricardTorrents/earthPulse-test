import {
  get_users_positions,
  login_firebase,
  register_firebase,
} from '../../services/firebase_api';
import { IUser, IUserPositions } from '../models';
import { authTypes } from '../reducers/dataTypes';

export interface ILogin {
  type: authTypes.AUTH_LOGIN;
  payload: { user: IUser };
}
export interface IAuthError {
  type: authTypes.AUTH_ERROR;
  payload: { authError: string };
}
export interface IAuthSetData {
  type: authTypes.AUTH_SET_DATA;
  payload: {};
}

export interface IFetchusersPositions {
  type: authTypes.FETCH_USERS_POSITION;
  payload: {
    userPositions: IUserPositions[];
  };
}
export type AuthActionTypes = ILogin | IAuthError | IFetchusersPositions;

export const login =
  (email: string, password: string) => async (dispatch: any) => {
    let user = null;
    try {
      user = await login_firebase(email, password);
    } catch (error) {
      await dispatch({
        type: authTypes.AUTH_ERROR,
        payload: {
          authError: error.message,
        },
      });
    }

    await dispatch({
      type: authTypes.AUTH_LOGIN,
      payload: {
        user,
      },
    });
  };

export const register =
  (
    name: string,
    lastname: string,
    email: string,
    password: string,
    latitude: number,
    longitude: number
  ) =>
  async (dispatch: any) => {
    let user = { name, lastname, email, uid: null, latitude, longitude };
    try {
      await register_firebase(user, password);
    } catch (error) {
      await dispatch({
        type: authTypes.AUTH_ERROR,
        payload: {
          authError: error.message,
        },
      });
    }
  };

export const setAuthError = (message: string) => async (dispatch: any) => {
  await dispatch({
    type: authTypes.AUTH_ERROR,
    payload: {
      authError: message,
    },
  });
};

export const setInitialData = () => async (dispatch: any) => {
  let state = JSON.parse(localStorage.getItem('data'));
  await dispatch({
    type: authTypes.AUTH_ERROR,
    payload: {
      ...state,
    },
  });
};

export const logout = () => async (dispatch: any) => {
  await dispatch({
    type: authTypes.AUTH_LOGIN,
    payload: {
      user: null,
    },
  });
};

export const fetchUserPositions = () => async (dispatch: any) => {
  try {
    let response = await get_users_positions();

    await dispatch({
      type: authTypes.FETCH_USERS_POSITION,
      payload: {
        userPositions: response,
      },
    });
  } catch (error) {
    await dispatch({
      type: authTypes.AUTH_ERROR,
      payload: {
        authError: error.message,
      },
    });
  }
};
