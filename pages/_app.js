import "../styles/globals.css"
import { AuthProvider } from "../context/AuthContext"
import { BasketProvider } from "../context/ShoppingBasket"
import { ProductsProvider } from "../context/ProductsContext"

function MyApp({ Component, pageProps }) {
  return (
    <BasketProvider>
      <AuthProvider>
        <ProductsProvider>
          <Component {...pageProps} />
        </ProductsProvider>
      </AuthProvider>
    </BasketProvider>
  )
}

export default MyApp
