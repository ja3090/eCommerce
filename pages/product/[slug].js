import Layout from "../../components/Layout"
import ProductInfo from "../../components/ProductInfo/ProductInfo"
import { API_URL } from "../../config/index"
import { useEffect, useState } from "react"
import styles from "../../styles/ProductPage.module.css"
import WriteReview from "../../components/Reviews/WriteReview"
import { useRouter } from "next/router"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useWindowDimensions } from "../../utils/windowDimensions"
import SlugHero from "../../components/SlugHero"
import ReviewSection from "../../components/Reviews/ReviewSection"

export default function ProductPage({ product, reviews, averageRating }) {
  const router = useRouter()
  const { width } = useWindowDimensions()

  const { attributes: item } = product

  const [wideViewport, setIsWide] = useState(false)
  const [showWriteReview, setShown] = useState(false)

  useEffect(() => {
    const isWide = window.matchMedia("(min-width: 809px)").matches
    if (wideViewport !== isWide) {
      setIsWide(isWide)
    }
  }, [width, wideViewport])

  return (
    <Layout title={`${item.Name} | Tech eCommerce`}>
      <div className={styles.wrap}>
        <ToastContainer />
        <SlugHero
          item={item}
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
  const res = await fetch(`${API_URL}/api/products`)
  const { data: products } = await res.json()

  const paths = products.map((product) => {
    return {
      params: { slug: product.attributes.slug },
    }
  })

  return {
    paths,
    fallback: "blocking",
  }
}

export async function getStaticProps({ params: { slug } }) {
  const res = await fetch(
    `${API_URL}/api/products?filters[slug][$eq]=${slug}&populate=*`
  )
  const { data } = await res.json()
  const product = data[0]

  const reviewsRes = await fetch(
    `${API_URL}/api/reviews?populate=*&filters[product][id][$eq]=${product.id}`
  )
  const { data: reviews } = await reviewsRes.json()

  const averageRating =
    reviews.reduce((a, b) => a + b.attributes.rating, 0) / reviews.length

  return {
    props: {
      product,
      reviews,
      averageRating,
    },
    revalidate: 10,
  }
}
