import Layout from "../components/Layout"
import PickCategory from "../components/PickCategory"
import ProductsView from "../components/ProductsView"

export default function Home() {
  return (
    <Layout>
      <PickCategory />
      <ProductsView />
    </Layout>
  )
}
