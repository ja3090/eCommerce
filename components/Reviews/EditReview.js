import styles from "../../styles/WriteReview.module.css"
import { useState } from "react"
import { updateReview } from "../../utils/reviewService"
import { toast } from "react-toastify"
import ReviewForm from "./ReviewForm"

export default function EditReview({ product, show, click, reviewToEdit }) {
  const [review, setReview] = useState({
    rating: reviewToEdit.attributes.rating,
    heading: reviewToEdit.attributes.heading,
    body: reviewToEdit.attributes.body,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setReview({ ...review, [name]: value })
  }

  const post = (e) => {
    e.preventDefault()
    if (!review.rating || !review.heading || !review.body) {
      toast.error(`All fields must not be empty`, { toastId: "EditFailure" })
      return
    }
    updateReview(review, product.id, reviewToEdit.id).then((data) => {
      toast.success(data.message, { toastId: "EditSuccess" })
      console.log(data.message)
    })

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
