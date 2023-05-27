import Layout from "../components/Layout"
import styles from "../styles/Checkout.module.css"
import { useContext, useState } from "react"
import BasketContext from "../context/ShoppingBasket"
import { loadStripe } from "@stripe/stripe-js"
import { handleSubmit } from "../utils/postBasket"
import AuthContext from "../context/AuthContext"
import { toast } from "react-toastify"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import ProductList from "../components/ProductList"

const Checkout = () => {
  const { items, total } = useContext(BasketContext)
  const { user } = useContext(AuthContext)

  const [address, _setAddress] = useState({
    name: "Test User",
    street: "123 Street",
    postCode: "AB12 CD3",
  })

  const stripePromise = loadStripe(
    "pk_test_51MQgfsEHzbYikqR4yVwz3IlUwNOojN25I6zugQXbAdfiJJP1BA8lcKolFN9sZC3ht0lHaYc0dwSDFoV44i4b5AEX001pWHTxkB"
  )

  return (
    <Layout>
      <ToastContainer />
      <div className={styles.container}>
        <article className={styles["product-display"]}>
          <h2>Order Summary</h2>
          <ProductList items={items} />
          <div className={styles["sub-total"]}>
            <h3>Sub-total:</h3>
            <h3 style={{ fontWeight: 100 }}>£{total.price}</h3>
          </div>
        </article>
        <form
          onSubmit={(e) =>
            handleSubmit(e, { items, user, address, stripePromise }).catch(
              (err) => toast.error(err)
            )
          }
          className={styles.form}
        >
          <h2>Address</h2>
          <label htmlFor="name">Name</label>
          <input value={address.name} name="name" readOnly />
          <label htmlFor="post-code">Post Code</label>
          <input value={address.postCode} name="post-code" readOnly />
          <label htmlFor="street">Street</label>
          <input value={address.street} name="street" readOnly />
          <button type="submit">Proceed to Payment</button>
        </form>
      </div>
    </Layout>
  )
}
export default Checkout
