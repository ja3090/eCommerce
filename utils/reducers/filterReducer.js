import { initialState } from "../hooks/useCustomerQueries"

function buildFilterQuery(applied) {
  const appliedEntries = Object.entries(applied)

  function buildFilterString(acc, [category, applied]) {
    return applied
      ? acc + `&filters[category][categoryName][$eq]=${category}`
      : acc
  }

  return appliedEntries.reduce(buildFilterString, "")
}

export default function filtersReducer(state, action) {
  switch (action.type) {
    case "setInitialAppliedState":
      return { ...state, applied: action.payload }
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
