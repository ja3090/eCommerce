import { useRouter } from "next/router"
import { useGetOrder } from "../../utils/hooks/getOrder"
import Layout from "../../components/Layout"
import styles from "../../styles/OrderConfirmedPage.module.css"
import { useBasketContext } from "../../context/ShoppingBasket"
import OrderInfo from "../../components/OrderSuccessPage/OrderInfo"
import NotFound from "../../components/OrderSuccessPage/NotFound"

export default function OrderConfirmed() {
  const router = useRouter()
  const { resetItems } = useBasketContext()

  const { uuid } = router.query

  const { order, orderPresent } = useGetOrder(uuid, resetItems)

  return (
    <Layout>
      <div className={styles.container}>
        {orderPresent ? (
          <OrderInfo
            addressKeys={Object.keys(order.address)}
            order={order.address}
            products={order.products}
          />
        ) : (
          <NotFound router={router} />
        )}
      </div>
    </Layout>
  )
}
