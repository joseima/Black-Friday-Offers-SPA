import { createContext, useReducer, ReactNode, useEffect, useState } from 'react'
import { type User, type Signed, Product, CartState } from '../types'
import { cartReducer, cartInitialState} from '../reducers/cart'
import { getFromStorage, saveToStorage, resetStorage } from '../utils/storage'

const defaultAccount = {
  name: "Admin",
  email: "mail@web.com",
  password: "123"
}

export interface CartContextType {
  account: User,
  signed: boolean,
  setAccount: (user: User) => void
  setSigned: (signed: Signed) => void
  signInUser: (user: User) => void
  signOutUser: () => void
  cart: CartState
  addToCart: (product: Product) => void
  removeFromCart: (product: Product) => void
  clearCart: () => void
}

export const CartContext = createContext<CartContextType | undefined>(undefined)

interface CartProviderProps {
  children: ReactNode;
}

const useCartReducer = () => {
  const [state, dispatch] = useReducer(cartReducer, cartInitialState)

  const addToCart = (product : Product) => dispatch({
    type: 'ADD_TO_CART',
    payload: product
  })

  const removeFromCart = (product : Product)  => dispatch({
    type: 'REMOVE_FROM_CART',
    payload: product
  })

  const clearCart = () => dispatch({ type: 'CLEAR_CART' })

  return { state, addToCart, removeFromCart, clearCart }
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [account, setAccount] = useState<User>(defaultAccount);
  const [signed, setSigned] = useState<boolean>(getFromStorage('_signed_') ?? false)

  useEffect(() => {
    const userSigned = getFromStorage<Signed>('_signed_')
    if (userSigned === true) {
      setSigned(true)
    }
  }, [signed])

    const signInUser =  (user : User) => {
      saveToStorage('_signed_', true)
      setSigned(true);
      saveToStorage('_account_', user)
      setAccount(user);
    }

    const signOutUser = () => {
      resetStorage('_signed_')
      resetStorage('_account_') 
      setSigned(false);
      setAccount(defaultAccount)
    }

  const { state, addToCart, removeFromCart, clearCart } = useCartReducer()

  return (
    <CartContext.Provider value={{
      account,
      setAccount,
      signed,
      setSigned,
      signInUser,
      signOutUser,
      cart: state,
      addToCart,
      removeFromCart,
      clearCart
    }}
    >
      {children}
    </CartContext.Provider>
  )
}
