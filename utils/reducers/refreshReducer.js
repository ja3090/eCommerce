export default function refreshReducer(state, action) {
  switch (action.type) {
    case "needsRefresh":
      return action.payload
    default:
      return state
  }
}
