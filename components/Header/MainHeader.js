import BasketContext from "../../context/ShoppingBasket"
import { resetPosition } from "../../utils/rememberScrollPosition"
import { useContext, useState } from "react"
import Logo2 from "../../public/logo2.svg"
import ShopBag from "../../public/shopping-bag2.svg"
import styles from "../../styles/Header.module.css"

export default function MainHeader({ router }) {
  const { total, setOpen } = useContext(BasketContext)

  const [searchField, setSearchField] = useState("")

  return (
    <div className={styles["container-main"]}>
      <Logo2
        onClick={() => {
          resetPosition()
          router.push("/")
        }}
      />
      <form
        onSubmit={(e) => {
          e.preventDefault()
          router.push(`/search?term=${searchField}`)
        }}
        className={styles["search-box"]}
      >
        <input
          type="search"
          placeholder="Search"
          onChange={(e) => setSearchField(e.target.value)}
        />
        <button type="submit"></button>
      </form>
      <ShopBag onClick={() => setOpen(true)} />
      {total.quantity > 0 && (
        <span className={styles["display-quantity"]}>{total.quantity}</span>
      )}
      <aside></aside>
    </div>
  )
}
