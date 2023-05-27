import styles from "../../styles/ProductInfo.module.css"

export default function ProductInfoTabBtn({ tabName, activeTab, moveTo }) {
  return (
    <button
      onClick={() => moveTo(tabName)}
      className={activeTab === tabName ? styles.active : ""}
    >
      {tabName}
    </button>
  )
}
