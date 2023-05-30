import { useState, useEffect } from "react"

export default function usePaginate(array) {
  const [currentPage, setPage] = useState(1)
  const [paginatedItems, setItems] = useState([])
  const [perPage, setPerPage] = useState(4)

  const totalPages = Math.ceil(array.length / perPage)

  const onNextPageClick = () => {
    const nextPage = array.slice(0, perPage * currentPage)
    setItems(nextPage)
  }

  const adjustColumnsForScreenWidth = () => {
    const twoColumns = window.matchMedia("(min-width: 520px)").matches
    if (twoColumns) {
      setPerPage(6)
    }
    const threeColumns = window.matchMedia("(min-width: 809px)").matches
    if (threeColumns) {
      setPerPage(9)
    }
    const fourColumns = window.matchMedia("(min-width: 1050px)").matches
    if (fourColumns) {
      setPerPage(12)
    }
  }

  useEffect(onNextPageClick, [currentPage, array, perPage])

  useEffect(adjustColumnsForScreenWidth, [])

  return {
    totalPages,
    paginatedItems,
    setPage,
    currentPage,
  }
}
