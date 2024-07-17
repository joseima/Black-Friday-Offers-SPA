import './Products.css'
import { AddToCartIcon, RemoveFromCartIcon } from '../utils/icons'
import { useCart } from '../hooks/useCart'
import { Product } from '../types';

interface ProductsProps {
  products: Product[];
}

export const Products: React.FC<ProductsProps> = ({ products }) => {
  const { addToCart, cart, removeFromCart } = useCart()

  const checkProductInCart = (product: Product) => {
    return cart.some(item => item.id === product.id)
  }

  return (
    <section className='products'>
      <ul>
        {products.map(product => {
          const isProductInCart = checkProductInCart(product)
          return (
            <li key={product.id}>
              <img src={product.image} alt={product.title} />
              <div><h3>{product.title}</h3>
                <p>{product.category}</p>
                <h5>{product.price}</h5>
              </div>
              <div>
                <button
                  style={{ background: isProductInCart ? 'linear-gradient(270deg,#ff4980,#ff1d24)' : 'linear-gradient(270deg,#646cff,#ff4980)' }}
                  onClick={() => {
                    isProductInCart ? removeFromCart(product) : addToCart(product)
                  }}
                >
                  {isProductInCart ? <RemoveFromCartIcon /> : <AddToCartIcon />}
                </button>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
