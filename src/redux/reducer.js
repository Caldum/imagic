const initialState = {
    filesUploaded: 0,
    files: []
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'ADD_FILE':
            return {
                filesUploaded: ++state.filesUploaded,
                files: state.files.concat({
                    id: state.filesUploaded,
                    filename: action.payload.filename,
                    name: action.payload.name,
                    extension: action.payload.extension,
                    identifier: action.payload.identifier
                })
            }
        default:
            return state;
    }
}