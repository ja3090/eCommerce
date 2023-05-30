import { useEffect, useState, useCallback } from "react"
import { NEXT_URL } from "../../config"

export const useGetOrder = (id) => {
  const [orderDetails, setOrderDetails] = useState({
    loaded: false,
    order: [],
  })

  const getOrder = useCallback(async () => {
    const res = await fetch(`${NEXT_URL}/api/viewOrder/${id}`, {
      credentials: "include",
    })

    const { data } = await res.json()

    setOrderDetails({ loaded: true, order: data?.order ?? [] })
  }, [id])

  useEffect(() => {
    if (!id) return
    getOrder()
  }, [id, getOrder])

  return orderDetails
}
