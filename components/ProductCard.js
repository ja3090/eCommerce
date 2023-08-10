import Image from "next/image"
import Link from "next/link"
import styles from "../styles/ProductCard.module.css"
import SkelProductCard from "./SkelProductCard"
import { useState } from "react"
import { setPageYOffset } from "../utils/rememberScrollPosition"

const addOption = (url, ...options) => {
  const splitUrl = url.split("/upload")
  const urlOptions = options.join("/")

  const [first, second] = splitUrl

  return first + "/upload/" + urlOptions + second
}

export default function ProductCard({ product }) {
  const { attributes: productInfo } = product
  const image = product.attributes.Image.data[0].attributes.formats.medium.url

  const placeholder = addOption(image, "pixelate:50")

  const [finishedLoading, setFinished] = useState(false)

  return (
    <Link href={`/product/${product.attributes.slug}`}>
      <a className={styles.container} onClick={() => setPageYOffset()}>
        <div className={styles.image}>
          <Image
            src={product.attributes.Image.data[0].attributes.formats.medium.url}
            alt={productInfo.name}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            // onLoadingComplete={() => setFinished(true)}
            placeholder={"blur"}
            // blurDataURL={placeholder}
            unoptimized
          />
        </div>
        {/* {finishedLoading ? (
          <div className={styles.info}>
            <p>{productInfo.Name}</p>
            <p>£{productInfo.Price}</p>
          </div>
        ) : null} */}
        <div className={styles.info}>
          <p>{productInfo.Name}</p>
          <p>£{productInfo.Price}</p>
        </div>
        {/* {finishedLoading ? null : <SkelProductCard />} */}
      </a>
    </Link>
  )
}
