export default function sortReducer(state, action) {
  switch (action.type) {
    case "sort":
      const { activeSort, sortBy, order } = action.payload

      return {
        ...state,
        activeSort: activeSort,
        sortQuery: `sort[0]=${sortBy}%3A${order}`,
      }
    default:
      return state
  }
}
