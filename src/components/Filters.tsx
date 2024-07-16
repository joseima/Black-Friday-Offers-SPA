import { useId } from 'react'
import './Filters.css'
import { useFilters } from '../hooks/useFilters'

export const Filters : React.FC  = () => {
  const { filters, setFilters } = useFilters()
  const minPriceFilterId = useId()
  const categoryFilterId = useId()

  const handleChangeMinPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prevState) => ({
      ...prevState,
      minPrice: Number(event.target.value)
    }))
  }

  const handleChangeCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prevState)  => ({
      ...prevState,
      category: event.target.value
    }))
  }

  return (
    <section className='filters'>
      <div>
        <label htmlFor={minPriceFilterId}>Min Price</label>
        <input type='range' id={minPriceFilterId} min='0' max='200' onChange={handleChangeMinPrice} value={filters.minPrice} />
        <span>€ {filters.minPrice}</span>
      </div>
      <div>
        <label htmlFor={categoryFilterId}>Category</label>
        <select id={categoryFilterId} onChange={handleChangeCategory}>
          <option value='all'>All</option>
          <option value='jewelery'>Jewelery</option>
          <option value='electronics'>Electronics</option>
          <option value="men's clothing">Men&apos;s clothing</option>
          <option value="women's clothing">Women&apos;s clothing</option>
        </select>
      </div>
    </section>
  )
}
