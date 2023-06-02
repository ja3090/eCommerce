import styles from "../../styles/PickCategory.module.css"

export default function Category({
  handleCategoryClick,
  applied,
  children,
  categoryName,
}) {
  return (
    <div
      className={styles.category}
      onClick={() => handleCategoryClick(categoryName)}
      style={applied ? { backgroundColor: "rgba(0, 106, 245, .5)" } : {}}
    >
      {children}
      <p>{categoryName}</p>
    </div>
  )
}
