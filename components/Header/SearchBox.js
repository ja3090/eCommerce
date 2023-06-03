import { useState } from "react"
import styles from "../../styles/SearchBox.module.css"
import useSearch from "../../utils/hooks/useSearch"
import SearchBoxProductCard from "./SearchBoxProductCard"
import { useRouter } from "next/router"
import { useRef } from "react"
import useClickOutsideToClose from "../../utils/hooks/useClickOutsideToClose"

export default function SearchBox() {
  const [focused, setFocus] = useState(false)

  const searchRef = useRef(null)

  const { search, searchResults, setSearchResults } = useSearch()

  const _ = useClickOutsideToClose(setFocus, searchRef)

  const router = useRouter()

  return (
    <form
      className={`${styles["search-box"]} ${
        focused ? styles["search-box-focused"] : null
      }`}
    >
      <input
        type="search"
        placeholder="Search"
        onChange={(e) => {
          const { value } = e.target
          if (!value) setSearchResults([])
          search(e.target.value)
        }}
        onFocus={() => setFocus(true)}
        ref={searchRef}
      />
      <aside
        className={`${
          focused ? styles["search-results"] : styles["hide-search-results"]
        } custom-scrollbar`}
      >
        {searchResults.map((result) => {
          return (
            <SearchBoxProductCard
              key={result.id}
              result={result}
              router={router}
            />
          )
        })}
      </aside>
      <button type="submit"></button>
    </form>
  )
}
