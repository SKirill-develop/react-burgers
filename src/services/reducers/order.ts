import { IOrderDetails, IOrderDetailsSuccess } from "../actions/interfaces";
import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILED,
  RESET_ORDER,
} from "../constants/index";
import { TOrderState } from "../types/index";

const initialState = {
  data: null,
  isLoading: false,
  error: null,
};

export const orderReducer = (
  state: TOrderState = initialState,
  action: IOrderDetails | IOrderDetailsSuccess
): TOrderState => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }
    case CREATE_ORDER_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        error: null,
      };
    }
    case CREATE_ORDER_FAILED: {
      return {
        ...state,
        data: null,
        isLoading: false,
        error: true,
      };
    }
    case RESET_ORDER: {
      return {
        ...state,
        data: null,
        isLoading: false,
        error: null,
      };
    }
    default:
      return state;
  }
};
