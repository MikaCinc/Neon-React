import initialState from "../.././Data/Uno";

function Uno(state, action) {
    if (typeof state === 'undefined') {
        return initialState;
    }
    switch (action.type) {
        default:
            return state;
    }

}

export default Uno;