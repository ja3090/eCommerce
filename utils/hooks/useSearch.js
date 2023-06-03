import { API_URL } from "../../config"
import { useState } from "react"
import debounce from "../debounce"

export default function useSearch() {
  const [searchResults, setSearchResults] = useState([])

  function fetchSearchResults(searchTerm) {
    if (!searchTerm) return
    fetch(
      `${API_URL}/api/products?populate=*&filters[name][$containsi]=${searchTerm}`
    )
      .then((res) => res.json())
      .then((res) => setSearchResults(res.data))
  }

  const search = debounce(fetchSearchResults)

  return { search, searchResults, setSearchResults }
}
