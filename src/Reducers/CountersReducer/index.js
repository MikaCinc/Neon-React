import initialState from '../../Data/Counters';
import deepFreeze from 'deep-freeze';

function CountersReducer(state = deepFreeze(initialState), action) {
    switch (action.type) {
        case 'INITIAL_STATE':
            return state;
        case 'NEW_COUNTER': {
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
        case 'EDIT_COUNTER': {
            const { data } = action;

            if (data && data.hasOwnProperty('ID')) {
                return deepFreeze(state.map((item) => {
                    if (item.ID === data.ID) {
                        return {
                            ...item,
                            ...data
                        };
                    }
                    return {
                        ...item
                    };
                }));
            }

            return state;
        }
        case 'DELETE_COUNTER': {
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
        case 'INCREASE': {
            const { data } = action;

            if (data === 0 || !isNaN(data)) {
                return deepFreeze(state.map((item) => {
                    if (item.ID === data) {
                        return {
                            ...item,
                            Value: item.Value + 1
                        };
                    }
                    return { ...item };
                }));
            }

            return state;
        }
        case 'DECREASE': {
            const { data } = action;

            if (data === 0 || !isNaN(data)) {
                return deepFreeze(state.map((item) => {
                    if (item.ID === data) {
                        return {
                            ...item,
                            Value: item.Value - 1
                        };
                    }
                    return { ...item };
                }));
            }

            return state;
        }
        default:
            return state;
    }
};

export default CountersReducer;