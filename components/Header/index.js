import styles from "../../styles/Header.module.css"
import { useRouter } from "next/router"
import { useScrollingUp } from "../../utils/hooks/isScrollingUp"
import ShoppingBasket from "./ShoppingBasket"
import MainHeader from "./MainHeader"
import SubHeader from "./SubHeader"

export default function Header() {
  const isScrollingUp = useScrollingUp()

  const router = useRouter()

  return (
    <header
      className={`${styles.header} ${isScrollingUp ? styles.sticky : ""}`}
    >
      <div className={styles.wrap}>
        <SubHeader router={router} />
        <MainHeader router={router} />
        <ShoppingBasket router={router} />
      </div>
    </header>
  )
}
