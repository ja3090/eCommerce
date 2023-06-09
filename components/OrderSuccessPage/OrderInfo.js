import styles from "../../styles/OrderConfirmedPage.module.css"
import ProductList from "../../components/ProductList"

const total = (arr) => arr.reduce((a, b) => a + b.price, 0)

export default function OrderInfo({ products, addressKeys, order }) {
  return (
    <div className={styles["order-info"]}>
      <h1>Order Confirmed!</h1>
      <h3>Order Summary</h3>
      <ProductList items={products} />
      <div className={styles.total}>
        <h3>Total:</h3>
        <h3>£{total(products)}</h3>
      </div>
      <div className={styles["delivery-info"]}>
        <h3>Delivery Address</h3>
        <div className={styles["address"]}>
          {addressKeys.map((el, ind) => (
            <p key={ind}>{order[el]}</p>
          ))}
        </div>
      </div>
    </div>
  )
}
