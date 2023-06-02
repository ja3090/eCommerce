import { createContext } from "react"
import { useMemo } from "react"
import ProductCard from "../components/ProductCard"
import useGetProducts from "../utils/hooks/getProducts"
import useCustomerQueries from "../utils/hooks/useCustomerQueries"

const ProductsContext = createContext()

export const ProductsProvider = ({ children }) => {
  const {
    applyFilters,
    setApplied,
    clearFilters,
    setActive,
    activeSort,
    needsRefresh,
    finishRefresh,
    fullQuery,
    applied,
    setPage,
    currentPage,
    perPage,
  } = useCustomerQueries()

  const { products, totalPages } = useGetProducts({
    needsRefresh,
    finishRefresh,
    fullQuery,
    currentPage,
    perPage,
  })

  const paginatedProductCards = useMemo(
    () => products.map((item) => <ProductCard key={item.id} product={item} />),
    [products]
  )

  return (
    <ProductsContext.Provider
      value={{
        applyFilters,
        setActive,
        activeSort,
        items: products,
        clearFilters,
        applied,
        setApplied,
        totalPages,
        setPage,
        currentPage,
        paginatedProductCards,
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}

export default ProductsContext
