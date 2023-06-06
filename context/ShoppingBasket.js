import { createContext, useState, useContext } from "react"
import useBasket from "../utils/hooks/useBasket"

const BasketContext = createContext()

function useBasketContext() {
  const context = useContext(BasketContext)
  if (context === undefined) {
    throw new Error(
      "useBasketContext must be used within a BasketContextProvider"
    )
  }
  return context
}

const BasketProvider = ({ children }) => {
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

export { useBasketContext, BasketProvider }
