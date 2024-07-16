import {  CartState, RemoveFromCartAction, CartAction, ClearCartAction,  AddToCartAction} from '../types';
import { saveToStorage, getFromStorage, resetStorage } from '../utils/storage';

export const cartInitialState : CartState  = getFromStorage('_cart_') || []

export const CART_ACTION_TYPES = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  CLEAR_CART: 'CLEAR_CART',
} as const;


type UpdateStateByAction = {
  [CART_ACTION_TYPES.ADD_TO_CART]: (state: CartState, action: AddToCartAction) => CartState;
  [CART_ACTION_TYPES.REMOVE_FROM_CART]: (state: CartState, action: RemoveFromCartAction) => CartState;
  [CART_ACTION_TYPES.CLEAR_CART]: (state: CartState, action: ClearCartAction) => CartState;
}

const UPDATE_STATE_BY_ACTION: UpdateStateByAction= {
  [CART_ACTION_TYPES.ADD_TO_CART]: (state, action ) => {
    const { id } = (action as AddToCartAction).payload;
    const productInCartIndex = state.findIndex((item) => item.id === id);
    if (productInCartIndex >= 0) {
      const newState = structuredClone(state);
      newState[productInCartIndex].quantity += 1;
      saveToStorage('_cart_', newState);
      return newState;
    }
    const newState = [
      ...state,
      {
        ...action.payload,
        quantity: 1,
      },
    ];
    saveToStorage('_cart_', newState);
    return newState;
  },
  [CART_ACTION_TYPES.REMOVE_FROM_CART]: (state: CartState, action: CartAction ) => {
    const { id } = (action as RemoveFromCartAction).payload;
    const newState = state.filter((item) => item.id !== id);
    saveToStorage('_cart_', newState);
    return newState;
  },
  [CART_ACTION_TYPES.CLEAR_CART]: () => {
    resetStorage('_cart_');
    return [];
  },
};

export const cartReducer = (state: CartState, action: CartAction ): CartState => {
  const updateState = UPDATE_STATE_BY_ACTION[action.type]
  return updateState ? updateState(state, action) : state
}
