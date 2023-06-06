import Rating from "./Rating"
import ProductInfo from "./ProductInfo"
import { useBasketContext } from "../context/ShoppingBasket"
import styles from "../styles/ProductPage.module.css"

export default function SlugHero({
  item,
  averageRating,
  reviewsLength,
  product,
  wideViewport,
}) {
  const { addItem, setOpen, items } = useBasketContext()

  const image = product.attributes.Image.data

  const alreadyAdded = items.some((item) => item.id === product.id)

  const productImage = {
    backgroundImage: `url(${image[1].attributes.formats.large.url})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
  }

  return (
    <div className={styles["hero-container"]}>
      <div className={styles["image-container"]} style={productImage}>
        <aside></aside>
      </div>
      <div className={styles["text-box"]}>
        <div className={styles.info}>
          <h1>{item.Name}</h1>
          <p>£{item.Price}</p>
          {averageRating ? (
            <div className={styles["average-rating"]}>
              <Rating rating={averageRating} />
              <p>from {reviewsLength} reviews</p>
            </div>
          ) : (
            <p>No reviews yet..</p>
          )}
          <a
            className={styles.btn}
            onClick={
              alreadyAdded ? () => setOpen(true) : () => addItem(product)
            }
          >
            {alreadyAdded ? "Go To Basket" : "Add To Bag"}
          </a>
        </div>
        {wideViewport ? <ProductInfo /> : null}
      </div>
    </div>
  )
}
