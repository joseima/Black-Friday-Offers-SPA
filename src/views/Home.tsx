import { Products } from '../components/Products'
import { Header } from '../components/Header'
import { useFilters } from '../hooks/useFilters'
import { Cart } from '../components/Cart'

export const Home = () => {
  const { filteredProducts } = useFilters()
  return (
    <>
      <Header />
      <Cart />
      <Products products={filteredProducts} />
    </>
  )
}