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
                  style={{ backgroundColor: isProductInCart ? '#c71212' : '#00593b' }}
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
