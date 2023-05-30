import { useEffect } from "react"
import {
  getPositionFromStorage,
  resetPosition,
} from "../rememberScrollPosition"

export default function useReturnToScrollPosition() {
  useEffect(() => {
    const yPosition = getPositionFromStorage()

    let timeoutFn

    if (yPosition) {
      window.scrollTo(0, yPosition)
      timeoutFn = setTimeout(() => resetPosition(), 500)
    }
    return () => clearTimeout(timeoutFn)
  }, [])
}
