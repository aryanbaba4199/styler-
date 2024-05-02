import axios from 'axios';
import * as actionType from '../constants/cartConstants';
import { useDispatch } from 'react-redux';


export const addToCart = (id, qty) =>async(dispatch) =>{
    
    try{
       const {data} = await axios.get(`/api/product/productDetails?id=${id}`)
        dispatch({type : actionType.ADD_TO_CART, payload : {...data, qty}});
    }catch(err){
        dispatch({type : actionType.ADD_TO_CART_ERROR, payload : err.message});
    }
}

export const removeFromCart = (id) => async(dispatch) =>{
    try{
        dispatch({type : actionType.REMOVE_FROM_CART, payload : id});
    }catch(err){

    }
}