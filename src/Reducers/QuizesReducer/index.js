import initialState from "../.././Data/Quizes";

function Quizes(state, action) {
  if (typeof state === 'undefined') {
    return initialState
  }
  switch (action.type) {
    case "qqq":
      return {}
    default:
      return state
  }
}

export default Quizes;