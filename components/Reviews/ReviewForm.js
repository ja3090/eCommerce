import Cross from "../../public/icons/cross.svg"
import styles from "../../styles/WriteReview.module.css"

export default function ReviewForm({
  setReview,
  click,
  handleChange,
  review,
  productName,
  post,
}) {
  return (
    <form className={styles["form-container"]}>
      <div className={styles.heading}>
        <h2>Write a review for {productName}</h2>
        <div
          className={styles.cross}
          onClick={(e) => {
            e.stopPropagation()
            click(false)
          }}
        >
          <Cross />
        </div>
      </div>
      <h3>Rating</h3>
      <div className={styles.rating}>
        {[...Array(5)].map((star, index) => {
          index += 1
          return (
            <button
              type="button"
              key={index}
              className={index <= review.rating ? styles.on : styles.off}
              onClick={() => setReview({ ...review, rating: index })}
            >
              <span className={styles.star}>&#9733;</span>
            </button>
          )
        })}
      </div>
      <h3>Review Title</h3>
      <div className={styles["title-box"]}>
        <input
          maxLength="20"
          name="heading"
          onChange={(e) => handleChange(e)}
        />
      </div>
      <h3>Review</h3>
      <div className={styles["body-box"]}>
        <textarea
          col="1"
          wrap="hard"
          maxLength="250"
          value={review.body}
          onChange={(e) => handleChange(e)}
          name="body"
        />
      </div>
      <button type="submit" className={styles.btn} onClick={(e) => post(e)}>
        Post Review
      </button>
    </form>
  )
}
