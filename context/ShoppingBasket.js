import { createContext, useState } from "react"
import useBasket from "../utils/useBasket"

const BasketContext = createContext()

export const BasketProvider = ({ children }) => {
  const [basketOpen, setOpen] = useState(false)

  const {
    items,
    resetItems,
    addItem,
    increaseQuantity,
    decreaseQuantity,
    total,
    removeItem,
  } = useBasket()

  return (
    <BasketContext.Provider
      value={{
        items,
        resetItems,
        addItem,
        increaseQuantity,
        decreaseQuantity,
        total,
        removeItem,
        setOpen,
        basketOpen,
      }}
    >
      {children}
    </BasketContext.Provider>
  )
}

export default BasketContext
