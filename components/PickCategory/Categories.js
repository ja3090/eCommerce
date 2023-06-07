import styles from "../../styles/PickCategory.module.css"
import Image from "next/image"

export default function Categories({
  categories,
  categoryRefs,
  clearFilters,
  applyFilters,
  applied,
  setApplied,
}) {
  return (
    <>
      {categories.map((entry, index) => {
        const { categoryName } = entry.attributes
        return (
          <div
            className={styles.category}
            onClick={() => setApplied(categoryName)}
            style={
              applied[categoryName]
                ? { backgroundColor: "rgba(0, 106, 245, .5)" }
                : null
            }
            key={entry.id}
            ref={(category) => (categoryRefs.current[index] = category)}
          >
            <div className={styles["svg-container"]}>
              <Image
                src={entry.attributes.categoryImage.data.attributes.url}
                alt={categoryName}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <p>{categoryName}</p>
          </div>
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
