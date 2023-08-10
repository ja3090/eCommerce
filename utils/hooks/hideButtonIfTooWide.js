import { useEffect, useState } from "react"

export default function useHideButtonIfTooWide(
  containerRef,
  buttonRef,
  loaded,
  refsToCalc
) {
  const [isTooWide, setTooWide] = useState(null)

  useEffect(() => {
    if (!loaded) return

    const totalWidthOfAllCategoryButtons = refsToCalc.current.reduce(
      (acc, ref) => ref.offsetWidth + acc,
      0
    )

    const tooWide = totalWidthOfAllCategoryButtons > containerRef.current?.offsetWidth

    setTooWide(tooWide)

    function moreThanOneRowOfCategoryButtons() {
      const totalWidthOfAllCategoryButtons = refsToCalc.current.reduce(
        (acc, ref) => ref.offsetWidth + acc,
        0
      )
      const tooWide = totalWidthOfAllCategoryButtons < containerRef.current?.offsetWidth

      tooWide
        ? (buttonRef.current.style = "display: none;")
        : (buttonRef.current.style = "")
    }
    window.addEventListener("resize", moreThanOneRowOfCategoryButtons)

    return () => {
      window.removeEventListener("resize", moreThanOneRowOfCategoryButtons)
    }
  }, [containerRef, buttonRef, refsToCalc, loaded])

  return isTooWide
}
