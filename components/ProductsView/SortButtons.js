import { useProductsContext } from "../../context/ProductsContext"
import SortBtn from "./SortBtn"

export default function SortButtons() {
  const { setActive, activeSort } = useProductsContext()
  return (
    <>
      <SortBtn
        btnName={"sortAToZ"}
        activeSort={activeSort}
        setActive={setActive}
        sortBy={"Name"}
        order={"asc"}
      >
        A-Z
      </SortBtn>
      <SortBtn
        btnName={"sortZToA"}
        activeSort={activeSort}
        setActive={setActive}
        sortBy={"Name"}
        order={"desc"}
      >
        Z-A
      </SortBtn>
      <SortBtn
        btnName={"sortHToL"}
        activeSort={activeSort}
        setActive={setActive}
        sortBy={"Price"}
        order={"desc"}
      >
        Price H-L
      </SortBtn>
      <SortBtn
        btnName={"sortLToH"}
        activeSort={activeSort}
        setActive={setActive}
        sortBy={"Price"}
        order={"asc"}
      >
        Price L-H
      </SortBtn>
    </>
  )
}
