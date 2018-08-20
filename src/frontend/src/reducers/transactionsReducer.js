import {
    TRANSACTIONS_LOADING,
    TRANSACTIONS_SUCCESS,
    TRANSACTIONS_PART_SUCCESS,
    TRANSACTIONS_ERROR,
    CURRENCIES_UPDATE,
    CATEGORIES_UPDATE,
    FORMATS_UPDATE,
    FILE_LOADING
}
from '../actions/types';

const initialState = {
    transactionsLoading: false,
    transactions: [],
    transactionsPart: [],
    transactionsError: false,
    currencies: [],
    categories: [],
    formats: [],
    fileLoading: false
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
        case TRANSACTIONS_PART_SUCCESS:
            return {
                ...state,
                transactionsPart: action.payload
            }
        case CURRENCIES_UPDATE:
            return {
                ...state,
                currencies: action.payload
            }
        case CATEGORIES_UPDATE:
            return {
                ...state,
                categories: action.payload
            }
        case FORMATS_UPDATE:
            return{
                ...state,
                formats: action.payload
            }
        case FILE_LOADING:
            return{
                ...state,
                fileLoading: action.payload
            }
        default:
            return state;
    }
}