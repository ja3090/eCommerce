import ShoppingBasketCard from "../ShoppingBasketCard"
import Cross from "../../public/icons/cross.svg"
import BasketContext from "../../context/ShoppingBasket"
import { useContext } from "react"
import styles from "../../styles/Header.module.css"
import AuthContext from "../../context/AuthContext"

export default function ShoppingBasket({ router }) {
  const { items, total, setOpen, basketOpen } = useContext(BasketContext)
  const { user } = useContext(AuthContext)
  return (
    <div
      className={`${styles["shopping-basket"]} ${
        basketOpen ? styles.show : ""
      }`}
    >
      <div className={styles["basket-heading"]}>
        <h3>Your Basket</h3>
        <Cross onClick={() => setOpen(false)} className={styles.cross} />
      </div>
      <div className={`${styles["basket-products"]} custom-scrollbar`}>
        {items.map((product) => (
          <ShoppingBasketCard key={product.id} product={product} />
        ))}
      </div>
      <div className={styles["total-display-and-checkout"]}>
        <div className={styles["price-display"]}>
          <p>Total</p>
          <p>£{total.price}</p>
        </div>
        {items.length ? (
          <button
            className={styles["checkout-button-container"]}
            onClick={
              user
                ? () => {
                    router.push("/checkout")
                    setOpen(false)
                  }
                : () => {
                    router.push("/login")
                    setOpen(false)
                  }
            }
          >
            Checkout
          </button>
        ) : null}
      </div>
      <div
        className={`${styles["shopping-basket-overlay"]} ${
          basketOpen
            ? styles[`darken-background`]
            : styles[`lighten-background`]
        }`}
        onClick={() => setOpen(false)}
      ></div>
    </div>
  )
}
