import styles from "../../styles/WriteReview.module.css"
import { useState } from "react"
import { toast } from "react-toastify"
import ReviewForm from "./ReviewForm"

export default function WriteReview({ product, show, click, formSubmit, reviewToEdit }) {
  const [review, setReview] = useState({
    rating: reviewToEdit ? reviewToEdit.attributes.rating : null,
    heading: reviewToEdit ? reviewToEdit.attributes.heading : "",
    body: reviewToEdit ? reviewToEdit.attributes.body : "",
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

    formSubmit(review, product.id, reviewToEdit ? reviewToEdit.id : null).then((data) => {
      toast.success(data.message, { toastId: "PostSuccess" })
      setReview({ rating: null, heading: "", body: "" })
      click(false)
    })
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
