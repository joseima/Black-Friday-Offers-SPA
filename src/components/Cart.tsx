/* eslint-disable react/prop-types */
import { useId, useState } from 'react'
import { CartIcon, ClearCartIcon, CloseIcon } from '../utils/icons'
import './Cart.css'
import { useCart } from '../hooks/useCart'

interface CartItemProps {
  image: string;
  price: number;
  title: string;
  quantity: number;
  addToCart: () => void;
}

const CartItem: React.FC<CartItemProps> = ({ image, price, title, quantity, addToCart }) => {
  return (
    <li>
      <img
        src={image}
        alt={title}
      />
      <div>
        <strong>{title}</strong> - ${price}
      </div>

      <footer>
        <small>
          Qty: {quantity}
        </small>
        <button className='bg-green bg-opacity-50' onClick={addToCart}>+</button>
      </footer>
    </li>
  )
}

export const Cart: React.FC  = () => {
  const CartCheckboxId = useId()
  const [cartOpen, setCartOpen] = useState(false)
  const { addToCart, clearCart, cart } = useCart()


  return (
    <>
      <label className='cart-button' onClick={() => setCartOpen( !cartOpen )} htmlFor={CartCheckboxId}>
            { cartOpen ? <CloseIcon /> : <CartIcon /> }
      </label>
      <input className='switch-checkbox' id={CartCheckboxId} type='checkbox' hidden />
      <aside className='cart'>
        <ul>
          {cart.map(product => (
            <CartItem
              key={product.id}
              addToCart={() => addToCart(product)}
              {...product}
            />
          ))}
        </ul>

        <button className='clear-cart-button' onClick={clearCart}>
          <ClearCartIcon />
        </button>
      </aside>
    </>
  )
}
