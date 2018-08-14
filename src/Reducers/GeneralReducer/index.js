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
    default:
      return state
  }
}

export default General;