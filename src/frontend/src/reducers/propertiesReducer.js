import {
    PROPERTIES_ERROR,
    PROPERTIES_LOADING,
    PROPERTIES_SUCCESS
}
from '../actions/types';

const initialState = {
    propertiesLoading: false,
    userProperties: [],
    propertiesError: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case PROPERTIES_LOADING:
            return {
                ...state,
                propertiesLoading: action.payload
            }
        case PROPERTIES_SUCCESS:
            return {
                ...state,
                userProperties: action.payload
            }
        case PROPERTIES_ERROR:
            return {
                ...state,
                propertiesError: action.payload
            }
        default:
            return state;
    }
}