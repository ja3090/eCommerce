export default function SortBtns({ btnName, activeSort, setActive, children }) {
  return (
    <button
      onClick={() => setActive(btnName)}
      style={activeSort === btnName ? { backgroundColor: "darkgray" } : null}
    >
      {children}
    </button>
  )
}
