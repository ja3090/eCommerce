import { useReducer } from "react"
import { rootReducer } from "../reducers"
import { useEffect } from "react"

export const initialState = {
  needsRefresh: false,
  filterQueries: {
    applied: {},
    filtersQuery: "",
  },
  sortQueries: {
    activeSort: null,
    sortQuery: "",
  },
  pageQueries: {
    currentPage: 1,
    perPage: 12,
  },
}

export function fullQueryString(state) {
  const { sortQueries, filterQueries } = state
  const sortQuery = sortQueries.sortQuery ? "&" + sortQueries.sortQuery : ""

  return () => filterQueries.filtersQuery + sortQuery
}

export default function useCustomerQueries(categories) {
  const [state, dispatch] = useReducer(rootReducer, initialState)

  const { needsRefresh } = state
  const { activeSort } = state.sortQueries
  const { applied } = state.filterQueries
  const { currentPage, perPage } = state.pageQueries

  useEffect(() => {
    const initialAppliedState = categories.reduce((acc, category) => {
      return { ...acc, [category.attributes.category]: false }
    }, {})

    dispatch({ type: "setInitialAppliedState", payload: initialAppliedState })
  }, [categories])

  return {
    applyFilters: () => dispatch({ type: "needsRefresh", payload: true }),
    setApplied: (category) => {
      dispatch({ type: "setApplied", payload: category })
    },
    clearFilters: () => dispatch({ type: "clearFilters" }),
    setActive: (payload) => {
      dispatch({ type: "sort", payload })
      dispatch({ type: "needsRefresh", payload: true })
    },
    finishRefresh: () => dispatch({ type: "needsRefresh", payload: false }),
    fullQuery: fullQueryString(state),
    setPage: () => {
      dispatch({ type: "setPage" })
      dispatch({ type: "needsRefresh", payload: true })
    },
    applied,
    activeSort,
    currentPage,
    perPage,
    needsRefresh,
  }
}
