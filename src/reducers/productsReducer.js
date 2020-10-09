import {FETCH_PRODUCTS, FILTER_PRODUCT_BY_SIZE, ORDER_PRODUCTS_BY_PRICE, RESET_FILTERS} from '../types';
export const productsReducer = (state = {}, action)=>{
    switch(action.type){
        case FILTER_PRODUCT_BY_SIZE:
            return {
                ...state,
                size : action.payload.size,
                filteredItems: action.payload.items
            };
        case ORDER_PRODUCTS_BY_PRICE:
            return {
               ...state,
               sort: action.payload.sort,
               filteredItems: action.payload.items
            };    
        case FETCH_PRODUCTS:
            return { items : action.payload, filteredItems: action.payload};
        
        case RESET_FILTERS: 
            return {
                items: action.payload.items,
                filteredItems: action.payload.items,
                sort: action.payload.sort,
                size: action.payload.size
            }
        
        default: 
            return state;
    }
};