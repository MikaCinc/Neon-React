export function increase(data) {
    return {
        type: 'INCREASE',
        data,
    };
};

export function decrease(data) {
    return {
        type: 'DECREASE',
        data
    };
};

export function new_counter(data) {
    return {
        type: 'NEW_COUNTER',
        data
    };
};

export function edit_counter(data) {
    return {
        type: 'EDIT_COUNTER',
        data
    };
};

export function delete_counter(data) {
    return {
        type: 'DELETE_COUNTER',
        data
    };
};