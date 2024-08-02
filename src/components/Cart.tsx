/* eslint-disable react/prop-types */
import { useId, useState } from 'react'
import { CartIcon,  CloseIcon, RemoveFromCartIcon } from '../utils/icons'
import './Cart.css'
import { useCart } from '../hooks/useCart'

interface CartItemProps {
  image: string;
  price: number;
  title: string;
  quantity: number;
  addToCart: () => void;
  removeFromCart: () => void;
}

const CartItem: React.FC<CartItemProps> = ({ image, price, title, quantity, addToCart, removeFromCart }) => {
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
        <button
                  style={{
                    backgroundImage: 'linear-gradient(270deg, #ff4980, #ff1d24)',
                  }}
                  onClick={removeFromCart }
                >
                  <RemoveFromCartIcon />
                </button>
      </footer>
    </li>
  )
}

export const Cart: React.FC  = () => {
  const CartCheckboxId = useId()
  const [cartOpen, setCartOpen] = useState(false)
  const { addToCart, removeFromCart, cart } = useCart()


  return (
    <>
      <label className='cart-button' onClick={() => setCartOpen( !cartOpen )} htmlFor={CartCheckboxId}>
            {  cart.length > 0 && <p>{cart.length}</p>}
            { cartOpen ? <CloseIcon /> : <CartIcon /> }
      </label>
      <input className='switch-checkbox' id={CartCheckboxId} type='checkbox' hidden />
      <aside className='cart'>
        <ul>
          {cart.map(product => (
            <CartItem
              key={product.id}
              addToCart={() => addToCart(product)}
              removeFromCart={() => removeFromCart(product)}
              {...product}
            />
          ))}
        </ul>

        <button className='clear-cart-button' >
          Process Order
        </button>
      </aside>
    </>
  )
}
