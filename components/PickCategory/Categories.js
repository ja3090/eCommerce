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
        const { category } = entry.attributes
        return (
          <div
            className={styles.category}
            onClick={() => setApplied(category)}
            style={
              applied[category]
                ? { backgroundColor: "rgba(0, 106, 245, .5)" }
                : null
            }
            key={entry.id}
            ref={(category) => (categoryRefs.current[index] = category)}
          >
            <div className={styles["svg-container"]}>
              <Image
                src={entry.attributes.categoryImage.data.attributes.url}
                alt={category}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <p>{category}</p>
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
