import { useReducer } from "react"
import { rootReducer } from "../reducers"

export const initialState = {
  needsRefresh: false,
  // fullQueryString: "",
  filterQueries: {
    applied: {
      Computer: false,
      Laptop: false,
      Mobile: false,
      Audio: false,
      Recording: false,
      Accessories: false,
      Photography: false,
    },
    filtersQuery: "",
  },
  sortQueries: {
    activeSort: null,
    sortQuery: "",
  },
  pageQueries: {
    currentPage: 1,
    perPage: 3,
  },
}

export function fullQueryString(state) {
  const { sortQueries, filterQueries } = state
  const sortQuery = sortQueries.sortQuery ? "&" + sortQueries.sortQuery : ""

  return () => filterQueries.filtersQuery + sortQuery
}

export default function useCustomerQueries() {
  const [state, dispatch] = useReducer(rootReducer, initialState)

  return {
    applyFilters: () => {
      dispatch({ type: "applyFilters" })
      dispatch({ type: "needsRefresh", payload: true })
    },
    setApplied: (category) => {
      dispatch({ type: "setApplied", payload: category })
    },
    clearFilters: () => dispatch({ type: "clearFilters" }),
    setActive: (sort) => {
      dispatch({ type: sort })
      dispatch({ type: "needsRefresh", payload: true })
    },
    activeSort: state.sortQueries.activeSort,
    needsRefresh: state.needsRefresh,
    finishRefresh: () => dispatch({ type: "needsRefresh", payload: false }),
    fullQuery: fullQueryString(state),
    applied: state.filterQueries.applied,
    setPage: () => {
      dispatch({ type: "setPage" })
      dispatch({ type: "needsRefresh", payload: true })
    },
    currentPage: state.pageQueries.currentPage,
    perPage: state.pageQueries.perPage,
  }
}
