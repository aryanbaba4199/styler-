import axios from "axios";
import * as actionTypes from "../constants/productConstant";


export const getproducts = ()=>async(dispatch) => {
    try{
        const {data} = await axios.get("api/product/createProduct")
        
        dispatch({ type: actionTypes.GET_PRODUCT_SUCCESS, payload: data });

    }catch(err){
        console.log("Error while calling geproducts", err.message);
        dispatch({type : actionTypes.GET_PRODUCT_FAILURE, payload : err.message});
    }
}

export const getProductDetails = (id) => async(dispatch) =>{
    try{
        dispatch({type : actionTypes.GET_PRODUCT_DETAILS_REQUEST});
        const {data} = await axios.get(`api/product/productDetails?id=${id}`);
        dispatch({type : actionTypes.GET_PRODUCT_DETAILS_SUCCESS, payload: data});
    }catch(err){
        dispatch({type : actionTypes.GET_PRODUCT_DETAILS_FAILURE, payload : err.message});    
    }
}