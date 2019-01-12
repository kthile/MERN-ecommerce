import React, { Component } from "react";
import PageTop from "../utils/PageTop";
import { connect } from "react-redux";
import {
  getProductDetail,
  clearProductDetail
} from "../../actions/products_actions";
import ProdNfo from "./ProdNfo";
import ProdImg from "./ProdImg";
import CircularProgress from "@material-ui/core/CircularProgress";
import { addToCart } from '../../actions/user_actions'

class Product extends Component {
  componentDidMount() {
    window.scrollTo(0,0);
    const id = this.props.match.params.id;
    this.props.dispatch(getProductDetail(id)).then(response=>{
        if(!this.props.products.prodDetail){
            this.props.history.push('/Error404')
        }
    });
  }

  componentWillUnmount() {
    this.props.dispatch(clearProductDetail());
  }

  addToCartHandler = (id) => {
    this.props.dispatch(addToCart(id))
  }

  render() {
    return (
      <div>
        <PageTop title="Product Detail" />

        <div className="container">
          {this.props.products.prodDetail ? (
            <div className="product_detail_wrapper">
              <div className="left">
                <div style={{ width: "500px" }}>
                  <ProdImg prodDetail={this.props.products.prodDetail} />
                </div>
              </div>
              <div className="right">
                <ProdNfo
                  prodDetail={this.props.products.prodDetail}
                  addToCart={id => this.addToCartHandler(id)}
                />
              </div>
            </div>
          ) : (
            <CircularProgress color={"primary"} thickness={7} />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products
  };
};

export default connect(mapStateToProps)(Product);
