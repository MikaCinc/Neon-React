export function new_note(data) {
    return {
        type: 'NEW_NOTE',
        data
    };
};

export function edit_note(data) {
    return {
        type: 'EDIT_NOTE',
        data
    };
};

export function delete_note(data) {
    return {
        type: 'DELETE_NOTE',
        data
    };
};