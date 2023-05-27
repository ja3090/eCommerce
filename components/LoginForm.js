import styles from "../styles/Login.module.css"
import AuthContext from "../context/AuthContext"
import { useContext } from "react"

export default function LoginForm({ form, handleDetails }) {
  const { login } = useContext(AuthContext)
  return (
    <form onSubmit={(e) => login(e, form)}>
      <div className={styles.field}>
        <div className={styles["text-container"]}>
          <input
            name="username"
            type="text"
            onChange={(e) => handleDetails(e)}
          />
          <label
            className={
              form.username
                ? `${styles.placeholder} ${styles.hide}`
                : styles.placeholder
            }
          >
            Username
          </label>
        </div>
      </div>
      <div className={styles.field}>
        <div className={styles["text-container"]}>
          <input
            name="password"
            type="password"
            onChange={(e) => handleDetails(e)}
          />
          <label
            className={
              form.password
                ? `${styles.placeholder} ${styles.hide}`
                : styles.placeholder
            }
          >
            Password
          </label>
        </div>
      </div>
      <button type="submit">Log In</button>
    </form>
  )
}
