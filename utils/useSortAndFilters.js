import { useState, useEffect, useCallback } from "react"
import sortFn from "./sortingFunctions"

export default function useSortAndFilters(products) {
  const [items, setItems] = useState(products)
  const [activeSort, setSortStatus] = useState("")

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

  const saveToSessionStorage = (name, values) => {
    sessionStorage.setItem(`${name}`, JSON.stringify(values))
  }

  const applyFilters = useCallback(
    (applied) => {
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
    },
    [products]
  )

  const clearFilters = () => {
    const categories = Object.keys(applied)
    categories.forEach((category) =>
      setApplied((prev) => ({ ...prev, [category]: false }))
    )
  }

  useEffect(() => {
    const filters = JSON.parse(sessionStorage.getItem("filters"))
    if (filters) {
      setApplied(filters)
      applyFilters(filters)
    }
    const sort = JSON.parse(sessionStorage.getItem("sort"))
    if (sort) {
      setSortStatus(sort)
      setItems((prev) => sortFn[sort](prev))
    }
  }, [applyFilters, setItems])

  useEffect(() => {
    saveToSessionStorage("filters", applied)
  }, [applied])

  useEffect(() => {
    saveToSessionStorage("sort", activeSort)
  }, [activeSort])

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
