import { useState, useEffect } from "react"
import { API_URL } from "../../config"
import { useCallback } from "react"

const getProducts = async (perPage, pageNumber, extraQueries = "") => {
  const res = await fetch(
    `${API_URL}/api/products?populate=*&pagination[start]=0&pagination[limit]=${
      pageNumber * perPage
    }${extraQueries}`
  )

  const data = await res.json()

  return data
}

export default function useGetProducts({
  fullQuery,
  currentPage,
  perPage,
  needsRefresh,
  finishRefresh,
}) {
  const [productData, setProductData] = useState({
    products: [],
    totalPages: null,
  })
  const { products, totalPages } = productData

  const fetchData = useCallback(
    async (fullQuery) => {
      try {
        const { data, meta } = await getProducts(
          perPage,
          currentPage,
          fullQuery
        )
        setProductData({
          products: data,
          totalPages: Math.ceil(meta.pagination.total / perPage),
        })
      } catch (error) {
        console.error(error)
      }
    },
    [currentPage, perPage]
  )

  useEffect(() => {
    fetchData()
  }, [fetchData])

  useEffect(() => {
    if (!needsRefresh) return
    fetchData(fullQuery())
    finishRefresh()
  }, [needsRefresh, fullQuery, currentPage, fetchData, finishRefresh])

  return { products, totalPages }
}
