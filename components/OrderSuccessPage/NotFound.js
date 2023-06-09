import styles from "../../styles/OrderConfirmedPage.module.css"

export default function NotFound({ router }) {
  return (
    <div className={styles.layout}>
      <h2>Sorry!</h2>
      <p>You either don&rsquo;t have permission to view this page or this order does not exist.</p>
      <button onClick={() => router.push("/")}>Return to Home?</button>
    </div>
  )
}
