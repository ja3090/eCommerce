import styles from "../../styles/PickCategory.module.css"
import Image from "next/image"

export default function Category({
  setApplied,
  categoryName,
  applied,
  entry,
  categoryRefs,
  index,
}) {
  return (
    <div
      className={styles.category}
      onClick={() => setApplied(categoryName)}
      style={applied[categoryName] ? { backgroundColor: "rgba(0, 106, 245, .5)" } : null}
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
}
