import { createContext } from "react"
import useSortAndFilters from "../utils/useSortAndFilters"
import usePaginate from "../utils/usePaginate"
import { useMemo } from "react"
import ProductCard from "../components/ProductCard"

const ProductsContext = createContext()

export const ProductsProvider = ({ children, products }) => {
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

  const paginatedProductCards = useMemo(() => {
    return paginatedItems.map((item) => (
      <ProductCard key={item.id} product={item} />
    ))
  }, [paginatedItems])

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
