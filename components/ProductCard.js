import Image from "next/image";
import Link from "next/link";
import styles from "../styles/ProductCard.module.css";
import { setPageYOffset } from "../utils/rememberScrollPosition";
import { Cloudinary } from "@cloudinary/url-gen";
import { scale } from "@cloudinary/url-gen/actions/resize";

export default function ProductCard({ product }) {
  const { attributes: productInfo } = product;
  const blurImageUrl =
    product.attributes.Image.data[0].attributes.formats.small.hash;
  const imageUrl =
    product.attributes.Image.data[0].attributes.formats.small.url;

  const cld = new Cloudinary({
    cloud: {
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_NAME,
    },
  });

  const image = cld.image(blurImageUrl).resize(scale().width(9)).toURL();

  return (
    <Link href={`/product/${product.attributes.slug}`}>
      <a className={styles.container} onClick={() => setPageYOffset()}>
        <div className={styles.image}>
          <Image
            src={imageUrl}
            alt={productInfo.name}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            placeholder="blur"
            blurDataURL={image}
            unoptimized
          />
        </div>
        <div className={styles.info}>
          <p>{productInfo.Name}</p>
          <p>£{productInfo.Price}</p>
        </div>
      </a>
    </Link>
  );
}
