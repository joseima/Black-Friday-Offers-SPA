import {  CartState, RemoveFromCartAction, ClearCartAction, CartAction, AddToCartAction} from '../types';
import { saveToStorage, getFromStorage, resetStorage } from '../utils/storage';

export const cartInitialState = getFromStorage('_cart_') || []

export const CART_ACTION_TYPES = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  CLEAR_CART: 'CLEAR_CART'
} as const

type UpdateStateByAction = {
  [key in keyof typeof CART_ACTION_TYPES]: (state: CartState, action: CartAction) => CartState;
};

const UPDATE_STATE_BY_ACTION: UpdateStateByAction = {
  [CART_ACTION_TYPES.ADD_TO_CART]: (state, action) => {
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
  [CART_ACTION_TYPES.REMOVE_FROM_CART]: (state, action) => {
    const { id } = (action as RemoveFromCartAction).payload;
    const newState = state.filter((item) => item.id !== id);
    saveToStorage('_cart_', newState);
    return newState;
  },
  [CART_ACTION_TYPES.CLEAR_CART]: () => {
    resetStorage('_cart_');
    return cartInitialState;
  },
};

export const cartReducer = (state: CartState, action: CartAction  ): CartState => {
  const { type: actionType } = action
  const updateState = UPDATE_STATE_BY_ACTION[actionType]
  return updateState ? updateState(state, action) : state
}
