export function new_task(data) {
    return {
        type: 'NEW_TASK',
        data,
    };
};

export function new_list(data) {
    return {
        type: 'NEW_LIST',
        data
    };
};

export function delete_list(data) {
    return {
        type: 'DELETE_LIST',
        data
    };
};

export function delete_task(data) {
    return {
        type: 'DELETE_TASK',
        data,
    };
};

export function edit_task(data) {
    return {
        type: 'EDIT_TASK',
        data
    };
};