import {  CartState,  CartAction, Product} from '../types';
import { saveToStorage, getFromStorage, resetStorage } from '../utils/storage';

export const cartInitialState : CartState  = getFromStorage('_cart_') || []

export const CART_ACTION_TYPES = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  CLEAR_CART: 'CLEAR_CART',
} as const;

export const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case CART_ACTION_TYPES.ADD_TO_CART: {
      const { id } = action.payload as Product;
      const productInCartIndex = state.findIndex(item => item.id === id);
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
    }
    case CART_ACTION_TYPES.REMOVE_FROM_CART: {
      const { id } = action.payload as { id: number };
      const newState = state.filter(item => item.id !== id);
      saveToStorage('_cart_', newState);
      return newState;
    }
    case CART_ACTION_TYPES.CLEAR_CART: {
      resetStorage('_cart_');
      return state;
    }
    default: {
      return state;
    }
  }
};