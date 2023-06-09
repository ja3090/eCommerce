import styles from "../../styles/ProductsView.module.css"
import DownArrow from "../../public/icons/down-arrow.svg"
import { useProductsContext } from "../../context/ProductsContext"
import { useRef, useState } from "react"
import Pagination from "../Pagination"
import SortButtons from "./SortButtons"
import useClickOutsideToClose from "../../utils/hooks/useClickOutsideToClose"

export default function ProductsView() {
  const { items } = useProductsContext()

  const [isClicked, setClicked] = useState(false)

  const sortBtnRef = useRef(null)

  const _ = useClickOutsideToClose(setClicked, sortBtnRef)

  return (
    <div className={styles.container}>
      <div className={styles.wrap}>
        <div className={styles["products-header"]}>
          <p>{items.length} results</p>
          <div
            className={styles["sort-btn"]}
            onClick={() => setClicked(!isClicked)}
            ref={sortBtnRef}
          >
            <p>Sort</p>
            <div className={isClicked ? `${styles.transform} ${styles.svg}` : styles.svg}>
              <DownArrow />
            </div>
          </div>
          <div
            className={isClicked ? `${styles.options} ${styles.show}` : styles.options}
          >
            <SortButtons />
          </div>
        </div>
        <Pagination array={items} />
      </div>
    </div>
  )
}
