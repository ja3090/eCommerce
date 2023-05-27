import styles from "../../styles/ProductsView.module.css"
import DownArrow from "../../public/icons/down-arrow.svg"
import ProductsContext from "../../context/ProductsContext"
import { useContext, useState } from "react"
import Pagination from "../Pagination"
import SortBtns from "./SortBtns"

export default function ProductsView() {
  const { setActive, activeSort, items } = useContext(ProductsContext)

  const [isClicked, setClicked] = useState(false)

  return (
    <div className={styles.container}>
      <div className={styles.wrap}>
        <div className={styles["products-header"]}>
          <p>{items.length} results</p>
          <div
            className={styles["sort-btn"]}
            onClick={() => setClicked(!isClicked)}
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
            >
              A-Z
            </SortBtns>
            <SortBtns
              btnName={"sortZToA"}
              activeSort={activeSort}
              setActive={setActive}
            >
              Z-A
            </SortBtns>
            <SortBtns
              btnName={"sortHToL"}
              activeSort={activeSort}
              setActive={setActive}
            >
              Price H-L
            </SortBtns>
            <SortBtns
              btnName={"sortLToH"}
              activeSort={activeSort}
              setActive={setActive}
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
