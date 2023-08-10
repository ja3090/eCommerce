import styles from "../../styles/PickCategory.module.css"
import DownArrow from "../../public/icons/down-arrow.svg"
import { useRef, useState } from "react"
import Categories from "./Categories"
import useHideButtonIfTooWide from "../../utils/hooks/hideButtonIfTooWide"
import { useProductsContext } from "../../context/ProductsContext"

export default function PickCategory() {
  const { categoriesLoaded } = useProductsContext()

  const [clicked, setClicked] = useState(false)

  const categoryRefs = useRef([])
  const containerRef = useRef(null)
  const viewMoreRef = useRef(null)

  const isTooWide = useHideButtonIfTooWide(
    containerRef,
    viewMoreRef,
    categoriesLoaded,
    categoryRefs
  )

  return (
    <div className={styles.container}>
      <div className={styles.wrap}>
        <div className={styles.header}>
          <p>All Products</p>
          <h2>What type of product are you looking for?</h2>
        </div>
        <div className={styles["categories-container"]}>
          <div
            className={`${styles.categories} ${
              clicked ? styles["categories-expand"] : ""
            }`}
            ref={containerRef}
          >
            <Categories categoryRefs={categoryRefs} />
          </div>
          <div
            className={`${styles["view-more"]}
                ${clicked ? styles.transform : ""}`}
            onClick={() => setClicked(!clicked)}
            style={isTooWide ? null : { display: "none" }}
            ref={viewMoreRef}
          >
            <DownArrow />
          </div>
        </div>
      </div>
    </div>
  )
}
