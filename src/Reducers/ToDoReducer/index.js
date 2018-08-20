import initialState from '../../Data/ToDo';
import deepFreeze from 'deep-freeze';

function ToDoReducer(state = deepFreeze(initialState), action) {
    switch (action.type) {
        case 'INITIAL_STATE':
            return state;

        case 'NEW_TASK': {
            const { data } = action;

            if (data && data.hasOwnProperty("ID") && data.hasOwnProperty("Task")) {
                return deepFreeze(state.map((item) => {
                    if (item.ID === data.ID) {
                        return {
                            ...item,
                            Todos: [
                                ...item.Todos, {
                                    ...data.Task
                                }
                            ]
                        }
                    } else {
                        return item
                    }
                }));
            }

            return state;
        }
        case 'NEW_LIST': {
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
        case 'DELETE_LIST': {
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
        case 'EDIT_LIST': {
            const { data } = action;

            if (data && data.hasOwnProperty('ID')) {
                return deepFreeze(state.map((item) => {
                    if (item.ID === data.ID) {
                        return {
                            ...item,
                            ...data
                        };
                    }
                    return {...item};
                }));
            }

            return state;
        }
        case "DELETE_TASK": {
            const { data } = action;

            if (data && data.hasOwnProperty('ID') && data.hasOwnProperty('Task')) {
                return deepFreeze(state.map((item) => {
                    if (item.ID === data.ID) {
                        return {
                            ...item,
                            Todos: item.Todos.filter((Todo) => {
                                if (Todo.ID !== data.Task.ID) {
                                    return true;
                                }
                                return false;
                            })
                        }
                    } else {
                        return item
                    }
                }));
            }

            return state;
        }
        case "EDIT_TASK": {
            const { data } = action;

            if (data && data.hasOwnProperty("ID") && data.hasOwnProperty("Task")) {
                return deepFreeze(state.map((list) => {
                    if (list.ID === data.ID) {
                        return {
                            ...list,
                            Todos: list.Todos.map((task) => {
                                if (task.ID === data.Task.ID) {
                                    return {
                                        ...task,
                                        ...data.Task
                                    }
                                } else {
                                    return task
                                }
                            })
                        }
                    } else {
                        return list
                    }
                }));
            }

            return state;
        }
        default:
            return state;
    }
};

export default ToDoReducer;