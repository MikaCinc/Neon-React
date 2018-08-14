import initialState from "../.././Data/User";

function User(state, action) {
    if (typeof state === 'undefined') {
        return initialState
    }
    switch (action.type) {
        case "NAME_CHANGE":
            return {
                ...state,
                name: action.name
            }
        default:
            return state
    }

}

export default User;