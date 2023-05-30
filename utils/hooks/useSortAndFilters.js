import { useState } from "react"
import sortFn from "../sortingFunctions"
import { useEffect } from "react"

export default function useSortAndFilters(products) {
  const [items, setItems] = useState(products)
  const [activeSort, setSortStatus] = useState("")

  useEffect(() => {
    if (!products.length) return
    setItems(products)
  }, [products])

  const [applied, setApplied] = useState({
    Computer: false,
    Laptop: false,
    Mobile: false,
    Audio: false,
    Recording: false,
    Accessories: false,
    Photography: false,
  })

  const setActive = (sort) => {
    setItems(sortFn[sort](items))
    setSortStatus(sort)
  }

  const applyFilters = (applied) => {
    const categories = Object.entries(applied)
    const filterBy = categories.filter(([, filtered]) => filtered)
    if (!filterBy.length) {
      setItems(products)
      setSortStatus("")
      return
    }
    const filtered = products.filter((product) =>
      filterBy.some(([category]) => category === product.attributes.Category)
    )
    setItems(filtered)
    setSortStatus("")
  }

  const clearFilters = () => {
    const categories = Object.keys(applied)
    categories.forEach((category) =>
      setApplied((prev) => ({ ...prev, [category]: false }))
    )
  }

  return {
    clearFilters,
    applyFilters,
    setActive,
    activeSort,
    applied,
    setApplied,
    items,
  }
}
