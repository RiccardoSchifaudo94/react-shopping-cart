import React, {Component} from 'react';
//import data from './data.json';
import Products from './components/Products';
import Filter from './components/Filter';
import Cart from './components/Cart';

import store from './store';
import { Provider } from 'react-redux';


class App extends Component{
  
  /*constructor(){
    super();
    this.state = {
      //products: data.products,
      cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")):[],
      //size:"",
      //  sort: ""
    }
  }*/

  /*createOrder = (order) =>{
    alert("Need to save order for "+ order.name);
  }

  removeFromCart = (product) =>{
    const cartItems = this.state.cartItems.slice();
    this.setState({cartItems: cartItems.filter(x=>x._id !== product._id)});
    localStorage.setItem("cartItems",JSON.stringify(cartItems.filter(x=>x._id !== product._id)));
  }


  addToCart = (product) =>{
    
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;
    
    cartItems.forEach(item=>{
      if(item._id === product._id){
        item.count++;
        alreadyInCart = true;
        window.location.reload();
      }
    }); 

    if(!alreadyInCart){
      cartItems.push({...product,count:1,changeAmount:false});
    }

    this.setState({cartItems});
    localStorage.setItem("cartItems",JSON.stringify(cartItems));

    
  }*/

   /*sortProducts = (event) =>{

    const sort = event.target.value;

    console.log(event.target.value);
    
    this.setState((state) =>({
      sort:sort,
      products:this.state.products
      .slice()
      .sort((a,b)=>
        sort === "lowest" 
        ? a.price < b.price 
          ? 1
          :-1
        :sort === "highest"
          ? a.price > b.price 
            ? 1
            :-1
          : a._id>b._id
            ? 1 
            :-1 
      )
    }));
  
  }
  filterProducts = (event) =>{
    console.log(event.target.value);
    if(event.target.value===""){
      
      this.setState({size:event.target.value,product:data.products});
    
    }
    else{
      
      this.setState({
        size:event.target.value,
        products: data.products.filter(product => product.availableSizes.indexOf(event.target.value) >= 0)
      });
    
    }

  }
  */
  render(){
    return (
      <Provider store={store}>
      <div className="grid-container">
          <header>
            <i className="fa fa-shopping-cart" style={{marginRight:"10px"}}></i>{" "}
            <a href="/">React Shopping Cart</a>
          </header>
          <main>
            <div className="content">
                <div className="main">
                  <Filter></Filter>
                  <Products></Products>
                </div>
                <div className="sidebar">
                    <Cart/>
                </div>
            </div>
          </main>
          <footer>All right is reserved</footer>
      </div>
      </Provider>
    );
  }
 
}

export default App;
