import React, { Component } from "react";
//import UserLayout from "../../hoc/UserLayout";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faFrown from "@fortawesome/fontawesome-free-solid/faFrown";
import faSmile from "@fortawesome/fontawesome-free-solid/faSmile";
import UserProductBlock from "../utils/User/UserProductBlock";

import { connect } from "react-redux";
import {
  getCartItems,
  removeCartItem,
  onSuccessBuy
} from "../../actions/user_actions";

import Paypal from "../utils/Paypal";

class UserCart extends Component {
  state = {
    loading: true,
    total: undefined,
    showTotal: false,
    showSuccess: false
  };

  componentDidMount() {
    let cartItems = [];
    let user = this.props.user;

    if (user.userData.cart) {
      if (user.userData.cart.length > 0) {
        user.userData.cart.forEach(item => {
          cartItems.push(item.id);
          //console.log(cartItem)
        });

        this.props
          .dispatch(getCartItems(cartItems, user.userData.cart))
          .then(() => {
            if (this.props.user.cartDetail.length > 0) {
              this.calculateTotal(this.props.user.cartDetail);
            }
          });
      }
    }
  }
  componentWillUnmount() {}

  calculateTotal = cartDetail => {
    let total = 0;
    cartDetail.forEach(item => {
      total += parseFloat(item.price, 10) * item.quantity;
    });
    this.setState({
      total,
      showTotal: true
    });
  };

  removeFromCart = id => {
    this.props.dispatch(removeCartItem(id)).then(() => {
      if (this.props.user.cartDetail.length <= 0) {
        this.setState({
          showTotal: false
        });
      } else {
        this.calculateTotal(this.props.user.cartDetail);
      }
    });
  };

  showNoItemMessage = () => (
    <div className="cart_no_items">
      <FontAwesomeIcon icon={faFrown} />
      <div>You have no items</div>
    </div>
  );

  showCartSuccessMessage = () => (
    <div className="cart_no_items">
      <FontAwesomeIcon icon={faSmile} />
      <div>Thank you for shopping!</div>
      <div>Order complete, see transaction details on your account</div>
    </div>
  );

  transactionError = data => {
    console.log("Paypal Err");
  };
  transactionCanceled = data => {
    console.log("Paypal Err");
  };
  transactionSuccess = data => {
    this.props
      .dispatch(
        onSuccessBuy({
          cartDetail: this.props.user.cartDetail,
          paymentData: data
        })
      )
      .then(() => {
        if (this.props.user.successBuy) {
          this.setState({
            showTotal: false,
            showSuccess: true
          });
        }else{
          console.log('failed')
        }
      });
  };

  render() {
    console.log(this.props.user);
    return (
      <div>
        <h1>My Cart</h1>
        <div className="user_cart">
          <UserProductBlock
            products={this.props.user}
            type="cart"
            removeItem={id => this.removeFromCart(id)}
          />
          {this.state.showTotal ? (
            <div className="user_cart_sum">
              <div>
                Total amount: $
                {this.state.total
                  .toFixed(2)
                  .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
              </div>
            </div>
          ) : this.state.showSuccess ? (
            this.showCartSuccessMessage()
          ) : (
            this.showNoItemMessage()
          )}
        </div>
        {this.state.showTotal ? (
          <div className="paypal_button_container">
            <Paypal
              toPay={this.state.total}
              transactionError={data => this.transactionError(data)}
              transactionCanceled={data => this.transactionCanceled(data)}
              onSuccess={data => this.transactionSuccess(data)}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};
export default connect(mapStateToProps)(UserCart);
