export default function paginationReducer(state, action) {
  switch (action.type) {
    case "setPage":
      return { ...state, currentPage: state.currentPage + 1 }
    default:
      return state
  }
}
