import styles from "../../styles/Reviews.module.css"
import Edit from "../../public/icons/edit.svg"
import Bin from "../../public/icons/bin.svg"
import { toast } from "react-toastify"
import { removeReview } from "../../utils/reviewService"

const deleteReview = (e, id) => {
  e.preventDefault()
  removeReview(id).then((data) => toast(data.message, { toastId: "DeleteSuccess" }))
}

export default function PostOptions({ setOpen, reviewId }) {
  return (
    <div className={styles["post-options"]}>
      <div onClick={() => setOpen(true)}>
        <Edit style={{ color: "#FFF" }} />
      </div>
      <div onClick={(e) => deleteReview(e, reviewId)}>
        <Bin />
      </div>
    </div>
  )
}
