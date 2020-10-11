const ADD_FILE = 'ADD_FILE';

export function addFile(data) {
    return dispatch => {
        dispatch({ type: ADD_FILE, payload: data });
    }
}