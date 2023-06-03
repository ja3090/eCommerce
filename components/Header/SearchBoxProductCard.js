import Image from "next/image"
import styles from "../../styles/SearchBox.module.css"

export default function SearchBoxProductCard({ result, router }) {
  return (
    <article key={result.id}>
      <ul
        className={styles["search-box-item"]}
        onClick={() => router.push(`/product/${result.attributes.slug}`)}
      >
        <li className={styles["image-container"]}>
          <Image
            src={
              result.attributes.Image.data[0].attributes.formats.thumbnail.url
            }
            alt={result.attributes.Name}
            layout="fill"
            objectFit="cover"
          />
        </li>
        <li className={styles["product-name"]}>{result.attributes.Name}</li>
      </ul>
    </article>
  )
}
