import styles from "../../styles/PickCategory.module.css";
import DownArrow from "../../public/icons/down-arrow.svg";
import { useRef, useState } from "react";
import Categories from "./Categories";
import { useProductsContext } from "../../context/ProductsContext";
import { useEffect } from "react";

export default function PickCategory() {
  const { applyFilters, clearFilters, categories, applied, setApplied } =
    useProductsContext();

  const [clicked, setClicked] = useState(false);

  const categoryRefs = useRef([]);
  const containerRef = useRef(null);

  const [isTooWide, setisTooWide] = useState(false);

  useEffect(() => {
    const isTooWide2 = () => {
      const isWide =
        categoryRefs.current.length > categories.length &&
        categoryRefs.current[0]?.offsetWidth * categoryRefs.current.length >
          containerRef.current?.offsetWidth;

      setisTooWide(isWide);
    };

    isTooWide2();

    window.addEventListener("resize", isTooWide2);

    return () => {
      window.removeEventListener("resize", isTooWide2);
    };
  }, [
    categories.length,
    categoryRefs.current.length,
    containerRef.current?.offsetWidth,
  ]);

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
            {categories.length ? (
              <>
                <Categories
                  categoryRefs={categoryRefs}
                  applyFilters={applyFilters}
                  clearFilters={clearFilters}
                  categories={categories}
                  applied={applied}
                  setApplied={setApplied}
                />
              </>
            ) : null}
          </div>
          <div
            className={`${styles["view-more"]}
                    ${clicked ? styles.transform : ""}`}
            onClick={() => setClicked(!clicked)}
            style={isTooWide ? null : { display: "none" }}
            // ref={viewMoreRef}
          >
            <DownArrow />
          </div>
        </div>
      </div>
    </div>
  );
}
