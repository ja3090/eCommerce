import { initialState } from "../hooks/useCustomerQueries"

function buildFilterQuery(applied) {
  const appliedEntries = Object.entries(applied)

  if (!appliedEntries.length) return ""

  const appliedFilters = appliedEntries.filter(([, filtered]) => filtered)

  function buildFilterString(acc, [category, applied], index) {
    let returnValue = applied ? acc + `[category][$eq]=${category}` : acc

    if (index !== appliedFilters.length - 1) returnValue += "&filters"

    return returnValue
  }

  return appliedFilters.reduce(buildFilterString, "&filters")
}

export default function filtersReducer(state, action) {
  switch (action.type) {
    case "setApplied":
      const category = action.payload
      const applied = {
        ...state.applied,
        [category]: !state.applied[category],
      }

      const query = buildFilterQuery(applied)

      return {
        ...state,
        applied,
        filtersQuery: query,
      }
    case "clearFilters":
      return {
        ...state,
        applied: initialState.filterQueries.applied,
        filtersQuery: "",
      }
    default:
      return state
  }
}
