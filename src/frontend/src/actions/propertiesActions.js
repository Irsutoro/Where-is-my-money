import { PROPERTIES_ERROR,PROPERTIES_LOADING,PROPERTIES_SUCCESS }
from './types';

const propertiesUrl = "http://www.iraminius.pl/wmm/api/user"

import axios from 'axios'

export const getUserProperties =  ()=>dispatch => {
    dispatch({
        type: PROPERTIES_LOADING,
        payload: true
    })
    dispatch({
        type: PROPERTIES_ERROR,
        payload: false
    })

    axios.get(propertiesUrl, {
            headers: {
                'Authorization': sessionStorage.getItem('Authorization')
            }
        })
        .then(res => {
            let userProperties = res.data
            dispatch({
                type: PROPERTIES_SUCCESS,
                payload: userProperties
            })
        })
        .catch(() => {
            dispatch({
                type: PROPERTIES_ERROR,
                payload: true
            })
        })
        .finally(() => { 
            dispatch({
                type: PROPERTIES_LOADING,
                payload: false
            })
        })
}
export const setUserProperties =  (userData) => dispatch => {
    dispatch({
        type: PROPERTIES_LOADING,
        payload: true
    })
    dispatch({
        type: PROPERTIES_ERROR,
        payload: false
    })

    
        axios.put(propertiesUrl, {
            username: userData.username,
            email: userData.email,
            password: userData.password
        }, {
            headers:{
                'Authorization': sessionStorage.getItem('Authorization')
            },
          }).then(res => {
            let userChangeSuccess = {text: "OK"}
            
            dispatch({
                type: PROPERTIES_SUCCESS,
                payload: userChangeSuccess
            })
        })
        .catch(() => {
            dispatch({
                type: PROPERTIES_ERROR,
                payload: true
            })
        })
        .finally(() => { 
            dispatch({
                type: PROPERTIES_LOADING,
                payload: false
            })
        })
}