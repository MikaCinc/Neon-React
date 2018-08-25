import initialState from '../../Data/Notes';
import deepFreeze from 'deep-freeze';

function CountersReducer(state = deepFreeze(initialState), action) {
    switch (action.type) {
        case 'INITIAL_STATE':
            return state;

        case 'NEW_NOTES': {
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

        case 'EDIT_NOTES': {
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

        case 'DELETE_NOTES': {
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

        default:
            return state;
    }
};

export default CountersReducer;