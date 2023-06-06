import styles from "../../styles/ProductsView.module.css"
import DownArrow from "../../public/icons/down-arrow.svg"
import { useProductsContext } from "../../context/ProductsContext"
import { useRef, useState } from "react"
import Pagination from "../Pagination"
import SortBtns from "./SortBtns"
import useClickOutsideToClose from "../../utils/hooks/useClickOutsideToClose"

export default function ProductsView() {
  const { setActive, activeSort, items } = useProductsContext()

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
            <div
              className={
                isClicked ? `${styles.transform} ${styles.svg}` : styles.svg
              }
            >
              <DownArrow />
            </div>
          </div>
          <div
            className={
              isClicked ? `${styles.options} ${styles.show}` : styles.options
            }
          >
            <SortBtns
              btnName={"sortAToZ"}
              activeSort={activeSort}
              setActive={setActive}
              sortBy={"Name"}
              order={"asc"}
            >
              A-Z
            </SortBtns>
            <SortBtns
              btnName={"sortZToA"}
              activeSort={activeSort}
              setActive={setActive}
              sortBy={"Name"}
              order={"desc"}
            >
              Z-A
            </SortBtns>
            <SortBtns
              btnName={"sortHToL"}
              activeSort={activeSort}
              setActive={setActive}
              sortBy={"Price"}
              order={"desc"}
            >
              Price H-L
            </SortBtns>
            <SortBtns
              btnName={"sortLToH"}
              activeSort={activeSort}
              setActive={setActive}
              sortBy={"Price"}
              order={"asc"}
            >
              Price L-H
            </SortBtns>
          </div>
        </div>
        <Pagination array={items} />
      </div>
    </div>
  )
}
