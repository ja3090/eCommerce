import { API_URL } from "../config"

export async function getStaticProductProps(slug) {
  const res = await fetch(`${API_URL}/api/products?populate=*&filters[slug][$eq]=${slug}`)
  const { data } = await res.json()
  const product = data[0]

  const reviewsRes = await fetch(
    `${API_URL}/api/reviews?populate=*&filters[product][id][$eq]=${product.id}`
  )
  const { data: reviews } = await reviewsRes.json()

  const averageRating = reviews.reduce((a, b) => a + b.attributes.rating, 0) / reviews.length

  return {
    props: {
      product,
      reviews,
      averageRating,
    },
    revalidate: 10,
  }
}

export async function getStaticProductPaths() {
  const res = await fetch(`${API_URL}/api/products?populate=*`)
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
