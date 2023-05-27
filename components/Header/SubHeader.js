import Link from "next/link"
import AuthContext from "../../context/AuthContext"
import { useContext } from "react"
import GitLogo from "../../public/gitLogo.svg"
import styles from "../../styles/Header.module.css"

export default function SubHeader() {
  const { user, logout } = useContext(AuthContext)
  return (
    <div className={styles["header-first-section"]}>
      <a
        className={styles["git-link"]}
        href="https://github.com/jaw162/eCommerce"
      >
        <GitLogo />
        <p>github.com/jaw162/eCommerce</p>
      </a>
      {user ? (
        <a className={styles["sign-in"]}>
          <p className={styles["welcome-message"]}>Welcome {user.username}</p>
          <p className={styles["log-out-btn"]} onClick={() => logout()}>
            Log Out
          </p>
        </a>
      ) : (
        <Link href="/login">
          <a className={styles["sign-in"]}>Sign In</a>
        </Link>
      )}
    </div>
  )
}
