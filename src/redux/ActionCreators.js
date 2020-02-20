import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const addComment = (dishId, rating, author, comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        dishId,
        rating,
        author,
        comment
    }
});

// This is a THUNK, because we are returning a function:
export const fetchDishes = () => (dispatch) => {
    // We dispatch the action
    dispatch(dishesLoading(true));

    return fetch(`${baseUrl}/dishes`)
        .then(res => {
            if(res.ok ) {
                return  res;
            } else {
                let error = new Error(`Error ${res.status}: ${res.statusText}`);
                error.res = res;
                throw error;
            }
        }, error => {
            let errmess = new Error(error.message);
            throw errmess;
        })
        .then(res => res.json())
        .then(dishes => dispatch(addDishes(dishes)))
        .catch(error => dispatch(dishesFailed(error.message)));
}

// Function that returns the object with the type
export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
});

//
export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});

// -----------------------------------------------------
// This is a THUNK, because we are returning a function:
export const fetchComments = () => (dispatch) => {

    return fetch(`${baseUrl}/comments`)
        .then(res => {
            if( res.ok ) {
                return  res;
            } else {
                let error = new Error(`Error ${res.status}: ${res.statusText}`);
                error.res = res;
                throw error;
            }
        }, error => {
            let errmess = new Error(error.message);
            throw errmess;
        })
        .then(res => res.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)));
}

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

// -----------------------------------------------------
// This is a THUNK, because we are returning a function:
export const fetchPromos = () => (dispatch) => {
    dispatch(promosLoading(true));

    return fetch(`${baseUrl}/promotions`)
        .then(res => {
            if(res.ok ) {
                return  res;
            } else {
                let error = new Error(`Error ${res.status}: ${res.statusText}`);
                error.res = res;
                throw error;
            }
        }, error => {
            let errmess = new Error(error.message);
            throw errmess;
        })
        .then(res => res.json())
        .then(promos => dispatch(addPromos(promos)))
        .catch(error => dispatch(promosFailed(error.message)));
}

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
});

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});