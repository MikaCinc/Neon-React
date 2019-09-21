import initialState from "../.././Data/General";
import _ from 'lodash';

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
    // case "TOGGLE_THEME":
    //   return {
    //     ...state,
    //     themeType: action.theme
    //   }
    case "CHANGE_THEME_PROPERTY":
      return {
        ...state,
        theme: {
          ...state.theme,
          ..._.set(state, `theme.${action.prop}`, action.value)
        }
      }
    default:
      return state
  }
}

export default General;