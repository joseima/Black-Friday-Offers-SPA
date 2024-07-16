export interface User  {
  name:string
  email: string
  password: string
}

export type Signed = boolean

export interface Product {
    id: number
    title: string
    description: string
    category: string
    image: string
    price: number
  }
  
  export interface CartProduct extends Product {
    quantity: number
  }
  
  export interface Filters {
    category: string
    minPrice: number
  }
  
  export interface CartItem extends Product {
    quantity: number;
  }
  
  export type CartState = CartItem[];
  
  export interface AddToCartAction {
    type: 'ADD_TO_CART';
    payload: Product;
  }
  
  export interface RemoveFromCartAction {
    type: 'REMOVE_FROM_CART';
    payload: { id: number };
  }
  
  export interface ClearCartAction {
    type: 'CLEAR_CART';
  }
  
  export type CartAction = AddToCartAction | RemoveFromCartAction | ClearCartAction ;