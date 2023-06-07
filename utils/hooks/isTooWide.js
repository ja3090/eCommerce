import { useState } from "react"
import { useEffect } from "react"

export default function useIsTooWide(width, pixels) {
  const [wideViewport, setIsWide] = useState(false)

  useEffect(() => {
    const isWide = window.matchMedia(`(min-width: ${pixels}px)`).matches
    if (wideViewport !== isWide) {
      setIsWide(isWide)
    }
  }, [width, wideViewport, pixels])

  return wideViewport
}
