import Layout from "../../components/Layout"
import ProductInfo from "../../components/ProductInfo"
import { useState } from "react"
import styles from "../../styles/ProductPage.module.css"
import WriteReview from "../../components/Reviews/WriteReview"
import { useRouter } from "next/router"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useWindowDimensions } from "../../utils/hooks/windowDimensions"
import SlugHero from "../../components/SlugHero"
import ReviewSection from "../../components/Reviews/ReviewSection"
import { getStaticProductPaths, getStaticProductProps } from "./productGetters"
import useIsTooWide from "../../utils/hooks/isTooWide"

export default function ProductPage({ product, reviews, averageRating }) {
  const router = useRouter()
  const { width } = useWindowDimensions()
  const wideViewport = useIsTooWide(width, 809)

  const [showWriteReview, setShown] = useState(false)

  return (
    <Layout title={`${product.attributes.Name} | Tech eCommerce`}>
      <div className={styles.wrap}>
        <ToastContainer />
        <SlugHero
          item={product.attributes}
          averageRating={averageRating}
          reviewsLength={reviews.length}
          product={product}
          wideViewport={wideViewport}
        />
        {wideViewport ? null : <ProductInfo />}
        <ReviewSection
          averageRating={averageRating}
          reviewsLength={reviews.length}
          router={router}
          product={product}
          reviews={reviews}
          setShown={setShown}
        />
        <WriteReview
          product={product}
          show={showWriteReview}
          click={setShown}
        />
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  return await getStaticProductPaths()
}

export async function getStaticProps({ params: { slug } }) {
  return await getStaticProductProps(slug)
}
