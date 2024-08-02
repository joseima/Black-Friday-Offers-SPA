import './Products.css'
import { AddToCartIcon, CloseIcon, RemoveFromCartIcon } from '../utils/icons'
import { useCart } from '../hooks/useCart'
import { Product } from '../types';
import { useState } from 'react';

interface ProductsProps {
  products: Product[];
}

export const Products: React.FC<ProductsProps> = ({ products }) => {
  const { addToCart, cart, removeFromCart } = useCart()
  const [activeProductId, setActiveProductId] = useState<number | null>(null);

  const checkProductInCart = (product: Product) => {
    return cart.some(item => item.id === product.id)
  }

  const handleToggleClass = (productId : Pick<Product, 'id'>['id']) => {
    setActiveProductId(activeProductId === productId ? null : productId);
  };

  return (
    <section className='products'>
      <ul>
        {products.map(product => {
          const isProductInCart = checkProductInCart(product)
          return (
            <li 
              key={product.id}
              className={activeProductId === product.id ? 'active' : ''}
            >
              <span  className="closeIcon"  onClick={() => handleToggleClass(product.id)}>
                <CloseIcon />
              </span>
              <img src={product.image} alt={product.title} />
              <h3 onClick={() => handleToggleClass(product.id)}>{product.title}</h3>
              <p className='product-desc'>{product.description}</p>
              <div className='priceBox'>
                <p>{product.category}</p>
                <h5>{product.price} €</h5>
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
