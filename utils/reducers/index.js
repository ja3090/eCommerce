import sortReducer from "./sortReducer"
import filtersReducer from "./filterReducer"
import refreshReducer from "./refreshReducer"
import paginationReducer from "./paginationReducer"

const reducers = {
  filterQueries: filtersReducer,
  sortQueries: sortReducer,
  needsRefresh: refreshReducer,
  pageQueries: paginationReducer,
}

function combineReducers(reducers) {
  return (state, action) => {
    const nextState = {}
    for (const key in reducers) {
      nextState[key] = reducers[key](state[key], action)
    }
    return nextState
  }
}

export const rootReducer = combineReducers(reducers)
