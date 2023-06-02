import styles from "../styles/Pagination.module.css"
import ProductsContext from "../context/ProductsContext"
import { useContext } from "react"
import useReturnToScrollPosition from "../utils/hooks/useReturnToScrollPosition"

export default function Pagination() {
  const { setPage, currentPage, totalPages, paginatedProductCards } =
    useContext(ProductsContext)

  console.log(totalPages)

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
