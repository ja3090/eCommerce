import Image from "next/image"
import styles from "../styles/Checkout.module.css"

const ProductList = ({ items }) => {
  return (
    <div>
      {items.map((el, ind) => {
        return (
          <div
            key={ind}
            className={
              ind + 1 === items.length
                ? styles["card-container"]
                : styles["card-container-with-border"]
            }
          >
            <div className={styles.image}>
              <Image
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                alt={el.name}
                src={
                  process.env.NODE_ENV === "development"
                    ? "/androidphone-mobile.jpg"
                    : el.image
                }
              />
            </div>
            <ul className={styles["product-info"]}>
              <li>
                <h4>{el.name}</h4>
              </li>
              <li>x{el.quantity}</li>
              <li>£{el.price}</li>
            </ul>
          </div>
        )
      })}
    </div>
  )
}
export default ProductList
