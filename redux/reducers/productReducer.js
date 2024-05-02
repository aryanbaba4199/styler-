import * as actionTypes from "../constants/productConstant"

export const getProductsReducer = (state = {products : []}, action) =>{
    switch(action.type){
        case actionTypes.GET_PRODUCT_SUCCESS:
            return {products : action.payload}
        case actionTypes.GET_PRODUCT_FAILURE:
            return {error : action.payload}
        default: return state
    }
}

export const getProductDetailReducer = (state = { product : {} }, action) =>{
    switch(action.type){
        case actionTypes.GET_PRODUCT_DETAILS_REQUEST:
            return {loading : true}
        case actionTypes.GET_PRODUCT_DETAILS_SUCCESS: 
            return {loading : false, product : action.payload}  
        case actionTypes.GET_PRODUCT_DETAILS_FAILURE:
            return {loading : false, error : action.payload}  
        case actionTypes.GET_PRODUCT_DETAILS_RESET:
            return { product : {} }
        default:
            return state           
    }
}