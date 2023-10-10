import { createContext, useContext } from "react";
import { useMemo } from "react";
import ProductCard from "../components/ProductCard";
import useGetProducts from "../utils/hooks/getProducts";
import useCustomerQueries from "../utils/hooks/useCustomerQueries";
import useGetCategories from "../utils/hooks/getCategories";

const ProductsContext = createContext();

const useProductsContext = () => {
  const context = useContext(ProductsContext);

  if (context === undefined) {
    throw new Error(
      "useProductsContext must be used within a ProductsContextProvider"
    );
  }
  return context;
};

const ProductsProvider = ({ children }) => {
  const { categories, categoriesLoaded } = useGetCategories();

  const {
    applyFilters,
    setApplied,
    clearFilters,
    setActive,
    activeSort,
    fullQuery,
    applied,
    setPage,
    currentPage,
    perPage,
    finishRefresh,
    needsRefresh,
  } = useCustomerQueries(categories);

  const { products, totalPages } = useGetProducts({
    fullQuery,
    currentPage,
    perPage,
    needsRefresh,
    finishRefresh,
  });

  const paginatedProductCards = useMemo(
    () => products.map((item) => <ProductCard key={item.id} product={item} />),
    [products]
  );

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
        categories,
        categoriesLoaded,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export { ProductsProvider, useProductsContext };
