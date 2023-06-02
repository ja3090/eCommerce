import styles from "../../styles/PickCategory.module.css"
import CameraIcon from "../../public/icons/device-camera-image.svg"
import ComputerIcon from "../../public/icons/device-computer.svg"
import AudioIcon from "../../public/icons/device-earphone-headphone.svg"
import LaptopIcon from "../../public/icons/device-laptop-notebook.svg"
import MicIcon from "../../public/icons/device-microphone-voice.svg"
import MouseIcon from "../../public/icons/device-mouse-cursor.svg"
import DownArrow from "../../public/icons/down-arrow.svg"
import Phone from "../../public/icons/device-smartphone.svg"
import ProductsContext from "../../context/ProductsContext"
import { useContext, useState } from "react"
import Category from "./Category"

export default function PickCategory() {
  const { applyFilters, clearFilters, applied, setApplied } =
    useContext(ProductsContext)

  const [clicked, setClicked] = useState(false)

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
          >
            <Category
              handleCategoryClick={setApplied}
              applied={applied.Computer}
              categoryName={"Computer"}
            >
              <ComputerIcon />
            </Category>
            <Category
              handleCategoryClick={setApplied}
              applied={applied.Laptop}
              categoryName={"Laptop"}
            >
              <LaptopIcon />
            </Category>
            <Category
              handleCategoryClick={setApplied}
              applied={applied.Mobile}
              categoryName={"Mobile"}
            >
              <Phone />
            </Category>
            <Category
              handleCategoryClick={setApplied}
              applied={applied.Audio}
              categoryName={"Audio"}
            >
              <AudioIcon />
            </Category>
            <Category
              handleCategoryClick={setApplied}
              applied={applied.Recording}
              categoryName={"Recording"}
            >
              <MicIcon />
            </Category>
            <Category
              handleCategoryClick={setApplied}
              applied={applied.Accessories}
              categoryName={"Accessories"}
            >
              <MouseIcon />
            </Category>
            <Category
              handleCategoryClick={setApplied}
              applied={applied.Photography}
              categoryName={"Photography"}
            >
              <CameraIcon />
            </Category>
            <div
              className={styles.category}
              onClick={() => applyFilters(applied)}
            >
              <p>Apply</p>
            </div>
            <div className={styles.category} onClick={() => clearFilters()}>
              <p>Clear</p>
            </div>
          </div>

          <div
            className={`${styles["view-more"]}
                ${clicked ? styles.transform : ""}`}
            onClick={() => setClicked(!clicked)}
          >
            <DownArrow />
          </div>
        </div>
      </div>
    </div>
  )
}
