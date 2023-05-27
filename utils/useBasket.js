import { useState, useEffect, useCallback } from "react"
import Cookies from "js-cookie"

const initialTotal = { price: 0, quantity: 0 }

export default function useBasket() {
  const [items, setItems] = useState([])
  const [total, setTotal] = useState(initialTotal)

  const calculateTotal = (items) => {
    const total = items.reduce((acc, current) => {
      return {
        price: acc.price + current.price * current.quantity,
        quantity: acc.quantity + current.quantity,
      }
    }, initialTotal)

    return {
      price: total.price.toFixed(2),
      quantity: total.quantity,
    }
  }

  useEffect(() => {
    setTotal(calculateTotal(items))
  }, [items])

  const updateCookies = (updated) => {
    Cookies.set("basket", JSON.stringify(updated), {
      expires: 7,
      sameSite: "strict",
    })
  }

  useEffect(() => {
    const basket = Cookies.get("basket")

    if (basket) {
      setItems(JSON.parse(basket))
    }
  }, [])

  const addItem = (product) => {
    const formattedProduct = createBasketProduct(product)
    const updated = items.concat(formattedProduct)
    setItems(updated)
    updateCookies(updated)
  }

  const increaseQuantity = (productId) => {
    const updated = items.map((item) => {
      if (item.id === productId) {
        return { ...item, quantity: item.quantity + 1 }
      } else {
        return item
      }
    })
    setItems(updated)
    updateCookies(updated)
  }

  const decreaseQuantity = (productId) => {
    const product = items.find((item) => item.id === productId)
    if (product.quantity === 1) return

    const updated = items.map((item) => {
      if (item.id === productId) {
        return { ...item, quantity: item.quantity - 1 }
      } else {
        return item
      }
    })
    setItems(updated)
    updateCookies(updated)
  }

  const createBasketProduct = (product) => {
    const productInfo = {
      id: product.id,
      name: product.attributes.Name,
      price: product.attributes.Price,
      image: product.attributes.Image.data[1].attributes.formats.thumbnail.url,
      quantity: 1,
    }
    return productInfo
  }

  const removeItem = (productId) => {
    const updated = items.filter((item) => item.id !== productId)
    setItems(updated)
    updateCookies(updated)
  }

  const resetItems = useCallback(() => {
    setItems([])
    updateCookies([])
  }, [])

  return {
    items,
    resetItems,
    addItem,
    increaseQuantity,
    decreaseQuantity,
    total,
    removeItem,
  }
}
