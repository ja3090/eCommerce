import { useEffect } from "react"

export default function useHideButtonIfTooWide(
  containerRef,
  buttonRef,
  refsToCalc
) {
  const totalWidthOfAllCategoryButtons = refsToCalc.current.reduce(
    (acc, ref) => ref.offsetWidth + acc,
    0
  )

  const tooWide =
    totalWidthOfAllCategoryButtons > containerRef.current?.offsetWidth

  useEffect(() => {
    function moreThanOneRowOfCategoryButtons() {
      const totalWidthOfAllCategoryButtons = refsToCalc.current.reduce(
        (acc, ref) => ref.offsetWidth + acc,
        0
      )
      const tooWide =
        totalWidthOfAllCategoryButtons < containerRef.current?.offsetWidth

      tooWide
        ? (buttonRef.current.style = "display: none;")
        : (buttonRef.current.style = "")
    }
    window.addEventListener("resize", moreThanOneRowOfCategoryButtons)

    return () => {
      window.removeEventListener("resize", moreThanOneRowOfCategoryButtons)
    }
  }, [containerRef, buttonRef, refsToCalc])

  return tooWide
}
