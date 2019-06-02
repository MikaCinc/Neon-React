export function delete_quiz(data) {
    return {
        type: 'DELETE_QUIZ',
        data
    };
};

export function new_quiz(data) {
    return {
        type: 'NEW_QUIZ',
        data
    };
};
