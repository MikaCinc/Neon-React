import initialState from "../.././Data/General";

function General(state, action) {
  if (typeof state === 'undefined') {
    return initialState
  }
  switch (action.type) {
    case "PAGE_CHANGE":
      return {
        ...state,
        currentPage: action.page
      }
    case "TOGGLE_HEADER":
      return {
        ...state,
        isHeaderOpen: !state.isHeaderOpen
      }
    case "TOGGLE_DRAWER":
      return {
        ...state,
        isDrawerOpen: !state.isDrawerOpen
      }
    default:
      return state
  }
}

export default General;