import * as ActionTypes from './ActionTypes';

export const Comments = (state = {
    errMess: null,
    comments: []
}, action) => {
    switch(action.type) {
        case ActionTypes.ADD_COMMENTS:
            return {...state, isLoading: false, errMes: null, comments: action.payload}
        case ActionTypes.COMMENTS_FAILED:
            return {...state, isLoading: false, errMes: action.payload(), comments: []}
        case ActionTypes.ADD_COMMENT:
            let comment = action.payload;
            // We know which id we have to create by the length of the state.
            comment.id = state.length;
            comment.date = new Date().toISOString();
            return {...state, comments: state.comments.concat(comment)}
        default:
            return state;
    }
}