import styles from "../styles/Pagination.module.css"
import { useProductsContext } from "../context/ProductsContext"
import useReturnToScrollPosition from "../utils/hooks/useReturnToScrollPosition"

export default function Pagination() {
  const { setPage, currentPage, totalPages, paginatedProductCards } =
    useProductsContext()

  const _ = useReturnToScrollPosition()

  return (
    <div className={styles.container}>
      {paginatedProductCards}
      {currentPage < totalPages && (
        <button onClick={() => setPage(currentPage + 1)} className={styles.btn}>
          View More
        </button>
      )}
    </div>
  )
}
