import { useState } from "react"
import { placeholderText, overviewTab } from "../../utils/placeholderText"
import styles from "../../styles/ProductInfo.module.css"
import ProductInfoTabBtn from "./ProductInfoTabBtn"
import ProductInfoTab from "./ProductInfoTab"

export default function ProductInfo() {
  const [tab, setTab] = useState("Overview")

  const moveTo = (tab) => {
    setTab(tab)
  }

  return (
    <div className={styles["product-info-container"]}>
      <div className={styles.buttons}>
        <ProductInfoTabBtn tabName="Overview" activeTab={tab} moveTo={moveTo} />
        <ProductInfoTabBtn tabName="Specs" activeTab={tab} moveTo={moveTo} />
        <ProductInfoTabBtn tabName="Returns" activeTab={tab} moveTo={moveTo} />
      </div>
      <div className={styles["details-container"]}>
        <div className={styles.details}>
          <ProductInfoTab activeTab={tab} tabName={"Overview"}>
            {overviewTab}
          </ProductInfoTab>
          <ProductInfoTab activeTab={tab} tabName={"Specs"}>
            {placeholderText}
          </ProductInfoTab>
          <ProductInfoTab activeTab={tab} tabName={"Returns"}>
            {placeholderText}
          </ProductInfoTab>
        </div>
      </div>
    </div>
  )
}
