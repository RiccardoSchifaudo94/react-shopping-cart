import React, { Component } from 'react'
import formatCurrency from './../util';
import Fade from 'react-reveal/Fade';

export default class Cart extends Component {
    
    constructor(props){
        super(props);
        this.state = { 
                        name:"",
                        email:"",
                        address:"",
                        showCheckout:false, 
                        cartItems: this.props.cartItems
                     };    
    }

    handleInput = (e) =>{
        this.setState({[e.target.name]:e.target.value })
    }

    createOrder = (e) =>{
        e.preventDefault();
        const order = {
            name: this.state.name,
            email: this.state.address,
            address : this.state.address,
            cartItems : this.props.cartItems
        }

        this.props.createOrder(order);
    }

    changeAmount = (item) =>{
        //alert("change amount");
        item.changeAmount = true;
        //console.log("stato oggetto da cambiare =>");         
        //console.log(this.props.cartItems);
        this.setState({cartItems:this.props.cartItems});
        localStorage.setItem("cartItems",JSON.stringify(this.state.cartItems));
    }

    saveAmount = (item) =>{
        //confirm("Do you want to confirm the changes?");
        item.changeAmount = false;
        //console.log("stato oggetto prima della modifica"); 
        //console.log(this.state.cartItems);
        //console.log("stato oggetto dopo la modifica"); 
        //console.log("cosa c'è dentro item: ");
        //console.log(item);
        //console.log("consa c'è dentro cart object:");
        this.props.cartItems.map((cart_obj)=>{
           //console.log(cart_obj);
           if(cart_obj._id===item._id){
               //console.log("hai trovato il match a "+item._id);
               //console.log("cart_obt = ");
               //cart_obj.count = 5;
               //console.log(cart_obj.count);
               //console.log("in item trovi :");
               //console.log(item.count);
               //console.log("eseguo cambio count e status = ");
               cart_obj.count = item.count;
               //console.log("adesso cart obj è uguale a :");
               //console.log(cart_obj);
           }
        });
        
        this.setState({cartItems:this.props.cartItems});
        localStorage.setItem("cartItems",JSON.stringify(this.state.cartItems));
        //console.log(this.state.cartItems);
    }
  
    render() {
        let {cartItems} = this.props;
        //let  cartItems  = localStorage.getItem("cartItems")? JSON.parse(localStorage.getItem("cartItems")):this.props.cartItems;
        let num_sub_total = 0;
        //console.log("render =");
        //console.log(JSON.parse(localStorage.getItem("cartItems")));
        cartItems.length === 0 ? (num_sub_total = 0 ): (cartItems.map(item=>( num_sub_total += item.count ))) ;
        return (
                <div>
                    { 
                        cartItems.length === 0 
                            ? (<div>
                                    <div className="cart cart-header"> <i className="fa fa-shopping-cart" style={{marginRight:"10px"}}></i>{" "} Cart is empty!</div>
                                    <div className="cart cart-subtotal">Nothing to show in the cart!</div>
                            </div>) 
                            : (<div>
                                    <div className="cart cart-header"> <i className="fa fa-shopping-cart" style={{marginRight:"10px"}}></i>{" "}{ cartItems.length } in the cart{" "}</div>
                                    <div className="cart cart-subtotal">Subtotal items: {num_sub_total} {" "}</div>
                                </div>
                              )             
                    }
                   
                    <div>
                        <div className="cart">
                            <Fade right cascade={true}>
                            <ul className="cart-items">
                                {cartItems.map((item,key)=>(
                                    <li key={item._id}>
                                        <div>
                                            <img src={item.image} alt={item.title}></img>
                                        </div>
                                        <div>
                                            <div>{item.title}</div>
                                            <div className="right">
                                            
                                                {formatCurrency(item.price)} x <input type="number" name="count_value" min={1} defaultValue={item.count} onChange={(e)=>{item.count=Number(e.target.value); }}  readOnly={!item.changeAmount}></input>
                                                { item.changeAmount 
                                                        ? ( <button className="button primary" type="submit" onClick={()=>this.saveAmount(item)}><i className="fa fa-save"></i> Save</button> )
                                                        : ( <button className="button" onClick={()=>this.changeAmount(item)}><i className="fas fa-pencil"></i> Change</button> )
                                                }   
                                                <button className="button" 
                                                        onClick={()=>this.props.removeFromCart(item)}>
                                                            <i className="fa fa-times"></i>{" "}Remove
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            </Fade>
                        </div>
                        {cartItems.length!==0 && (
                            <div>
                               <div className="cart">
                               <div className="total">
                                   <div>
                                       Total: {" "}
                                       { formatCurrency(cartItems.reduce((a,c)=> a + c.price * c.count, 0 )) }
                                   </div>
                                   <button className="button primary" onClick={
                                                                                ()=>{
                                                                                        this.setState({showCheckout:true});
                                                                                    }
                                                                               }>
                                   <i className="fa fa-cart-arrow-down"></i>{" "}Proceed
                                   </button>
                               </div>
                           </div>
                           {this.state.showCheckout && (
                               <Fade right cascade={true}>
                               <div className="cart">
                                    <form onSubmit={this.createOrder}>
                                        <ul className="form-container">
                                            <li>
                                                <label>Email</label>
                                                <input name="email"
                                                       type="email" 
                                                       required 
                                                       onChange={this.handleInput}>
                                                </input>
                                            </li>
                                            <li>
                                                <label>Name</label>
                                                <input name="name"
                                                       type="text" 
                                                       required 
                                                       onChange={this.handleInput}>
                                                </input>
                                            </li>
                                            <li>
                                                <label>Address</label>
                                                <input name="address"
                                                       type="address" 
                                                       required 
                                                       onChange={this.handleInput}>
                                                </input>
                                            </li>
                                            <li>
                                                <button type="submit" className="button primary">
                                                    <i className="fa fa-check"></i>{" "}Checkout
                                                </button>
                                            </li>
                                        </ul>
                                    </form>
                               </div>
                               </Fade>
                           )}
                           </div>
                        )}
                    </div>
                </div>
            
        );
    }
}
