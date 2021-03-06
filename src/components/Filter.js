import React, { Component } from 'react';
import { connect } from 'react-redux';
import {filterProducts,sortProducts,resetFilters} from '../actions/productActions';

class Filter extends Component {

    render() {
        return (
            !this.props.filteredProducts 
                ? (<div style={{marginLeft:"30px",marginTop:"20px"}}>Loading ...</div>)
                : ( 
                    <div className="filter">
                        <div className="filter-result">
                            <i className="fa fa-tags"></i>{" "}{this.props.filteredProducts.lenght} {" "}Products</div>
                        <div className="filter-sort">
                            <i className="fa fa-cart-arrow-down"></i>{" "}Order{" "}
                            <select value={this.props.sort} 
                                    onChange={(e) => 
                                        this.props.sortProducts(
                                            this.props.filteredProducts, 
                                            e.target.value
                                        )
                                }>
                                <option value="latest">Latest</option>
                                <option value="lowest">Lowest</option>
                                <option value="highest">Highest</option>
                            </select>
                        </div>
                        <div className="filter-size">
                            <i className="fa fa-filter"></i>{" "}Filter{" "}
                            <select value={this.props.size} 
                                    onChange={(e) => {
                                        this.props.filterProducts(
                                            this.props.products, 
                                            e.target.value
                                        )}
                                    }>
                                <option value="">ALL</option>
                                <option value="XS">XS</option>
                                <option value="S">S</option>
                                <option value="M">M</option>
                                <option value="L">L</option>
                                <option value="XL">XL</option>
                                <option value="XXL">XXL</option>
                            </select>
                            <button className="button" onClick={this.props.resetFilters} style={{float:"right"}}><i className="fa fa-eraser"></i> Reset</button>
                        </div>
                    </div>
                )
           
        )
    }
}
export default connect((state)=>({
    size:state.products.size,
    sort: state.products.sort,
    products: state.products.items,
    filteredProducts: state.products.filteredItems
}),{
    filterProducts,
    sortProducts,
    resetFilters
})(Filter);