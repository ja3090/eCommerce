export default function SortBtns({
  btnName,
  activeSort,
  setActive,
  children,
  sortBy,
  order,
}) {
  return (
    <button
      onClick={() => setActive({ activeSort: btnName, sortBy, order })}
      style={activeSort === btnName ? { backgroundColor: "darkgray" } : null}
    >
      {children}
    </button>
  )
}
