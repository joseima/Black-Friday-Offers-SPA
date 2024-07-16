import { useContext, useEffect, useState } from 'react'
import { FiltersContext } from '../context/filters'
import { Product } from '../types'
import { getItems } from "../utils/services";

export const useFilters = () => {
  const [fetchedItems, setFetchedItems] = useState< Product[]>([])
  const context = useContext(FiltersContext);

  if (context === undefined) {
    throw new Error('useFilters must be used within a FiltersProvider');
  }

  const { filters, setFilters } = context;


  useEffect(() => {
    const fetchData = async () => {
      try {
        const newItems = await getItems();
        setFetchedItems(newItems);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };
    fetchData();
  }, []);

  const filterProducts = (products: Product[]) => {
    return products.filter(product => {
      return (
        product.price >= filters.minPrice && (
          filters.category === 'all' || product.category === filters.category
        )
      )
    })
  }

  const filteredProducts = filterProducts(fetchedItems)


  return { filters, filteredProducts, setFilters }
}
