import styles from "../../styles/ProductInfo.module.css"

export default function ProductInfoTab({ activeTab, tabName, children }) {
  return (
    <article
      className={styles.info}
      style={activeTab === tabName ? { display: "block" } : null}
    >
      {children}
    </article>
  )
}
