import { useEffect, useState } from "react"
import { API_URL } from "../../config"

async function fetchCategories() {
  const res = await fetch(`${API_URL}/api/categories?populate=*`)

  const { data } = await res.json()

  return data
}

export default function useGetCategories() {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const data = await fetchCategories()
        setCategories(data ?? [])
      } catch (error) {
        console.error(error)
      }
    }

    fetchHandler()
  }, [])

  return categories
}
