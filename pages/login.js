import Layout from "../components/Layout"
import { useState } from "react"
import styles from "../styles/Login.module.css"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import LoginForm from "../components/LoginForm"

export default function LoginPage() {
  const [form, setDetails] = useState({
    username: "",
    password: "",
  })

  const handleDetails = (e) => {
    const { name, value } = e.target
    setDetails({ ...form, [name]: value })
  }

  return (
    <Layout title={"Login"}>
      <ToastContainer />
      <div className={styles.container}>
        <div className={styles.wrap}>
          <h1>Login</h1>
          <div className={styles["test-credentials"]}>
            <p>Test Credentials</p>
            <p>
              Username: <strong>test</strong>
            </p>
            <p>
              Password: <strong>test123</strong>
            </p>
          </div>
          <LoginForm form={form} handleDetails={handleDetails} />
        </div>
      </div>
    </Layout>
  )
}
