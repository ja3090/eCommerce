import { useRouter } from "next/router"
import { useGetOrder } from "../../utils/hooks/getOrder"
import Layout from "../../components/Layout"
import styles from "../../styles/OrderConfirmedPage.module.css"
import ProductList from "../../components/ProductList"
import { useBasketContext } from "../../context/ShoppingBasket"
import { useEffect } from "react"

export default function OrderConfirmed() {
  const router = useRouter()
  const { resetItems } = useBasketContext()

  const { uuid } = router.query

  const data = useGetOrder(uuid)

  useEffect(() => {
    if (data.loaded && data.order.length) resetItems()
  }, [resetItems, data.order.length, data.loaded])

  const total = (arr) => arr.reduce((a, b) => a + b.price, 0)

  return (
    <Layout>
      <div className={styles.container}>
        {data.loaded &&
          (data.loaded && data.order?.length ? (
            <div className={styles["order-info"]}>
              <h1>Order Confirmed!</h1>
              <h3>Order Summary</h3>
              <ProductList items={data.order[0].products} />
              <div className={styles.total}>
                <h3>Total:</h3>
                <h3>£{total(data.order[0].products)}</h3>
              </div>
              <div className={styles["delivery-info"]}>
                <h3>Delivery Address</h3>
                <div className={styles["address"]}>
                  {Object.keys(data.order[0].address).map((el, ind) => (
                    <p key={ind}>{data.order[0].address[el]}</p>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.layout}>
              <h2>Sorry!</h2>
              <p>
                You either don&rsquo;t have permission to view this page or this
                order does not exist.
              </p>
              <button onClick={() => router.push("/")}>Return to Home?</button>
            </div>
          ))}
      </div>
    </Layout>
  )
}
