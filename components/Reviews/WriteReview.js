import styles from "../../styles/WriteReview.module.css"
import { useState } from "react"
import { postReview } from "../../utils/reviewService"
import { toast } from "react-toastify"
import ReviewForm from "./ReviewForm"

export default function WriteReview({ product, show, click }) {
  const [review, setReview] = useState({
    rating: null,
    heading: "",
    body: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setReview({ ...review, [name]: value })
  }

  const post = (e) => {
    e.preventDefault()
    if (!review.rating || !review.heading || !review.body) {
      toast.error(`All fields must not be empty`, { toastId: "PostFailure" })
      return
    }
    postReview(e, review, product.id).then((data) =>
      toast.success(data.message, { toastId: "PostSuccess" })
    )

    setReview({ rating: null, heading: "", body: "" })
    click(false)
  }

  return (
    <div className={`${styles.container} ${show ? styles.show : styles.hide}`}>
      <ReviewForm
        click={click}
        handleChange={handleChange}
        post={post}
        review={review}
        setReview={setReview}
        productName={product.attributes.Name}
      />
    </div>
  )
}
