import { useEffect, useState, useCallback } from "react"
import { NEXT_URL } from "../../config"

async function fetchOrder(id) {
  const res = await fetch(`${NEXT_URL}/api/viewOrder/${id}`, {
    credentials: "include",
  })

  const { data } = await res.json()

  return data
}

export const useGetOrder = (id, resetItems) => {
  const [orderDetails, setOrderDetails] = useState({
    loaded: false,
    order: {},
  })

  const { loaded, order } = orderDetails

  const handleFetch = useCallback(async () => {
    try {
      const data = await fetchOrder(id)

      const order = data.order[0]

      setOrderDetails({ loaded: true, order })
      resetItems()
    } catch (err) {
      console.error(err)
    }
  }, [id, resetItems])

  useEffect(() => {
    if (!id) return
    handleFetch()
  }, [handleFetch, id])

  return { loaded, order, orderPresent: loaded && !!order }
}
