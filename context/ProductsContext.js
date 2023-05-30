import { createContext, useState, useEffect } from "react"
import useSortAndFilters from "../utils/hooks/useSortAndFilters"
import usePaginate from "../utils/hooks/usePaginate"
import { useMemo } from "react"
import ProductCard from "../components/ProductCard"
import { API_URL } from "../config"

const getProducts = async () => {
  const res = await fetch(`${API_URL}/api/products?populate=*`)

  const data = await res.json()

  return data
}

const ProductsContext = createContext()

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getProducts()
        setProducts(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [])

  const {
    clearFilters,
    applyFilters,
    setActive,
    activeSort,
    applied,
    setApplied,
    items,
  } = useSortAndFilters(products)

  const { totalPages, paginatedItems, setPage, currentPage } =
    usePaginate(items)

  const paginatedProductCards = useMemo(
    () =>
      paginatedItems.map((item) => (
        <ProductCard key={item.id} product={item} />
      )),
    [paginatedItems]
  )

  return (
    <ProductsContext.Provider
      value={{
        applyFilters,
        setActive,
        activeSort,
        items,
        clearFilters,
        applied,
        setApplied,
        totalPages,
        items,
        setPage,
        currentPage,
        paginatedItems,
        paginatedProductCards,
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}

export default ProductsContext
