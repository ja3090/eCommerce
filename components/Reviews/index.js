import styles from "../../styles/Reviews.module.css"
import Rating from "../Rating"
import { useState } from "react"
import { useAuthContext } from "../../context/AuthContext"
import SubmitReview from "./SubmitReview"
import PostOptions from "./PostOptions"
import { updateReview } from "../../utils/reviewService"

export default function Review({ review, product }) {
  const { user } = useAuthContext()

  const { attributes: info } = review

  const [editModalOpen, setOpen] = useState(false)

  const userAndAuthor = user && user.id === info.users_permissions_user.data.id

  return (
    <div className={styles["review-container"]}>
      {userAndAuthor ? (
        // <EditReview
        //   product={product}
        //   show={editModalOpen}
        //   click={setOpen}
        //   reviewToEdit={review}
        // />
        <SubmitReview
          product={product}
          show={editModalOpen}
          click={setOpen}
          formSubmit={updateReview}
          reviewToEdit={review}
        />
      ) : null}
      <div className={styles["by-and-date"]}>
        <p className={styles.author} style={userAndAuthor ? { color: "blue" } : null}>
          {userAndAuthor ? "You" : info.users_permissions_user.data.attributes.username}
        </p>
        <p className={styles.date}>{info.createdAt.slice(0, 10)}</p>
        {userAndAuthor ? <PostOptions setOpen={setOpen} reviewId={review.id} /> : null}
      </div>
      <Rating rating={info.rating} />
      <h3>{info.heading}</h3>
      <p>{info.body}</p>
    </div>
  )
}
