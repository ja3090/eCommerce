export default function sortReducer(state, action) {
  switch (action.type) {
    case "sortAToZ":
      return {
        ...state,
        activeSort: "sortAToZ",
        sortQuery: "sort[0]=Name",
      }
    case "sortZToA":
      return {
        ...state,
        activeSort: "sortZToA",
        sortQuery: "sort[0]=Name%3Adesc",
      }
    case "sortHToL":
      return {
        activeSort: "sortHToL",
        sortQuery: "sort[0]=Price%3Adesc",
      }
    case "sortLToH":
      return {
        ...state,
        activeSort: "sortLToH",
        sortQuery: "sort[0]=Price%3Aasc",
      }
    default:
      return state
  }
}
