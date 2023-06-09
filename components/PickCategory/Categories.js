import styles from "../../styles/PickCategory.module.css"
import Category from "./Category"
import { useProductsContext } from "../../context/ProductsContext"

export default function Categories({ categoryRefs }) {
  const { applyFilters, clearFilters, categories, applied, setApplied } =
    useProductsContext()
  return (
    <>
      {categories.map((entry, index) => {
        const { categoryName } = entry.attributes
        return (
          <Category
            applied={applied}
            setApplied={setApplied}
            entry={entry}
            key={entry.id}
            categoryName={categoryName}
            categoryRefs={categoryRefs}
            index={index}
          />
        )
      })}
      <div
        ref={(button) => (categoryRefs.current[categories.length] = button)}
        className={styles.category}
        onClick={applyFilters}
      >
        <p>Apply</p>
      </div>
      <div
        ref={(button) => (categoryRefs.current[categories.length + 1] = button)}
        className={styles.category}
        onClick={clearFilters}
      >
        <p>Clear</p>
      </div>
    </>
  )
}
