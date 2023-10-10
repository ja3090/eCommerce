// import Image from "next/image";
import Link from "next/link";
import styles from "../styles/ProductCard.module.css";
import { setPageYOffset } from "../utils/rememberScrollPosition";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, placeholder } from "@cloudinary/react";

export default function ProductCard({ product }) {
  const { attributes: productInfo } = product;
  const imageUrl =
    product.attributes.Image.data[0].attributes.formats.small.hash;

  const cld = new Cloudinary({
    cloud: {
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_NAME,
    },
  });

  const image = cld.image(imageUrl);

  console.log(product.attributes.Image.data[0].attributes.formats.medium.hash);

  return (
    <Link href={`/product/${product.attributes.slug}`}>
      <a className={styles.container} onClick={() => setPageYOffset()}>
        <div className={styles.image}>
          {/* <Image
            src={imageUrl}
            alt={productInfo.name}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            unoptimized
          /> */}
          <AdvancedImage
            cldImg={image}
            plugins={[placeholder({ mode: "blur" })]}
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
