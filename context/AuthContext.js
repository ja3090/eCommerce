import { createContext, useState, useEffect, useContext } from "react"
import { useRouter } from "next/router"
import loginService from "../utils/authService"
import { toast } from "react-toastify"

const AuthContext = createContext()

const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuthContext must be used within a AuthContextProvider")
  }
  return context
}

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)

  const router = useRouter()

  useEffect(() => {
    loginService
      .checkIfLoggedIn()
      .then((res) => setUser(res.user))
      .catch(errorHandler)
  }, [])

  const errorHandler = (err) => {
    toast.error(err ?? "Something went wrong.")
    setError(err)
    setTimeout(() => setError(null), 5000)
  }

  const login = (e, { username, password }) => {
    loginService
      .login(e, { username, password })
      .then((res) => {
        setUser(res.user)
        router.push("/")
      })
      .catch(errorHandler)
  }

  const logout = () => {
    loginService
      .logout()
      .then((_res) => {
        setUser(null)
      })
      .catch(errorHandler)
  }

  return (
    <AuthContext.Provider value={{ user, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export { useAuthContext, AuthProvider }
