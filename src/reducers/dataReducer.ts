import { IUser, IUserPositions } from '../models';
import { AuthActionTypes } from '../actions/dataActions';
import { authTypes } from './dataTypes';
export interface DataReducer {
  user: IUser | null;
  accessToken: string | null;
  authError: string | null;
  userPositions: IUserPositions[] | null;
}

const initialState: DataReducer = {
  accessToken: null,
  user: null,
  authError: null,
  userPositions: null,
};

export function dataReducer(
  state = initialState,
  action: AuthActionTypes
): DataReducer {
  switch (action.type) {
    case authTypes.AUTH_LOGIN:
    case authTypes.AUTH_ERROR:
    case authTypes.FETCH_USERS_POSITION:
      console.log('aqui', {
        ...state,
        ...action.payload,
      });
      localStorage.setItem(
        'data',
        JSON.stringify({
          ...state,
          ...action.payload,
        })
      );
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
}
