import {
    TRANSACTIONS_LOADING,
    TRANSACTIONS_SUCCESS,
    TRANSACTIONS_ERROR
}
from '../actions/types';

const initialState = {
    transactionsLoading: false,
    transactions: [],
    transactionsError: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case TRANSACTIONS_LOADING:
            return {
                ...state,
                transactionsLoading: action.payload
            }
        case TRANSACTIONS_SUCCESS:
            return {
                ...state,
                transactions: action.payload
            }
        case TRANSACTIONS_ERROR:
            return {
                ...state,
                transactionsError: action.payload
            }
        default:
            return state;
    }
}