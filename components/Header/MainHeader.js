import { useBasketContext } from "../../context/ShoppingBasket"
import { resetPosition } from "../../utils/rememberScrollPosition"
import Logo2 from "../../public/logo2.svg"
import ShopBag from "../../public/shopping-bag2.svg"
import styles from "../../styles/Header.module.css"
import SearchBox from "./SearchBox"

export default function MainHeader({ router }) {
  const { total, setOpen } = useBasketContext()

  return (
    <div className={styles["container-main"]}>
      <Logo2
        onClick={() => {
          resetPosition()
          router.push("/")
        }}
      />
      <SearchBox router={router} />
      <ShopBag onClick={() => setOpen(true)} />
      {total.quantity > 0 && (
        <span className={styles["display-quantity"]}>{total.quantity}</span>
      )}
      <aside className={styles.trim}></aside>
    </div>
  )
}
