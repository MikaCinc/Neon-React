import initialState from "../.././Data/Quizes";
import deepFreeze from 'deep-freeze';

function Quizes(state, action) {
  if (typeof state === 'undefined') {
    return initialState
  }
  switch (action.type) {
    case "qqq":
      return {};
    case 'DELETE_QUIZ': {
      const { data } = action;

      if (data && data.hasOwnProperty('ID')) {
        return deepFreeze(state.filter((item) => {
          if (item.ID !== data.ID) {
            return true;
          }
          return false;
        }));
      }

      return state;
    }
    case 'NEW_QUIZ': {
      const { data } = action;

      if (data) {
          return [
              ...state,
              {
                  ...data
              }
          ];
      }

      return state;
  }
    default:
      return state;
  }
}

export default Quizes;