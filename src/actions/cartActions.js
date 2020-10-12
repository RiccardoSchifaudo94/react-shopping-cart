import { ADD_TO_CART, REMOVE_FROM_CART } from "../types";
import store from '../store';

export const addToCart = (product) => (dispatch) => {
    alert("add");
    const cartItems = store.getState().cart.cartItems.slice();
    
    let alreadyExist = false;

    cartItems.forEach(x => {
        if(x._id=== product._id){
            alreadyExist = true;
            x.count++;
        }
    });

    if(!alreadyExist){
        cartItems.push({...product, count:1});
    }

    dispatch({
        type:ADD_TO_CART,
        payload:{
            cartItems
        }
    });
    
    localStorage.setItem("cartItems",JSON.stringify(cartItems));
    window.location.reload();
}

export const removeFromCart = (product) => (dispatch) => {
    alert("remove");
    console.log(product);
    const cartItems = store.getState()
        .cart.cartItems.slice()
        .filter((x)=> x._id !== product._id);
    console.log("cartItems");
    console.log(cartItems);
    dispatch({
        type:REMOVE_FROM_CART,
        payload:{
            cartItems
        }
    });

    localStorage.setItem("cartItems",JSON.stringify(cartItems));
}