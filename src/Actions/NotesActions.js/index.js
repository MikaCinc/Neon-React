export function new_notes(data) {
    return {
        type: 'NEW_NOTES',
        data
    };
};

export function edit_notes(data) {
    return {
        type: 'EDIT_NOTES',
        data
    };
};

export function delete_notes(data) {
    return {
        type: 'DELETE_NOTES',
        data
    };
};