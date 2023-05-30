import { useEffect } from "react"

export default function useClickOutsideToClose(closeSetter, ...refsToIgnore) {
  useEffect(() => {
    const closeMenu = (event) => {
      const shouldIgnore = refsToIgnore.some(
        (ref) =>
          event.target === ref.current ||
          event.target.parentNode === ref.current
      )
      if (shouldIgnore) return
      closeSetter(false)
    }

    window.addEventListener("click", closeMenu)

    return () => window.removeEventListener("click", closeMenu)
  }, [closeSetter, refsToIgnore])
}
