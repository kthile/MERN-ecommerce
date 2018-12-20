import React, { Component } from "react";
import MyButton from "../utils/Button";
import { connect } from "react-redux";
import { addToCart } from "../../actions/user_actions"

export class Card extends Component {
  renderCardImage(images) {
    if (images.length > 0) {
      return images[0].url;
    } else {
      return "/images/not_avail.png";
    }
  }

  render() {
    const props = this.props;
    return (
      <div className={`card_item_wrapper ${props.grid}`}>
        <div
          className="image"
          style={{
            background: `url(${this.renderCardImage(props.images)}) no-repeat`
          }}
        />
        <div className="action_container">
          <div className="tags">
            <div className="brand">{props.brand.name}</div>
            <div className="name">{props.name}</div>
            <div className="price">${props.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</div>
          </div>

          {props.grid ? (
            <div className="description">
              <p>{props.description}</p>
            </div>
          ) : null}
          <div className="actions">
            <div className="button_wrapp">
              <MyButton
                type="default"
                altClass="card_link"
                title="View product"
                linkTo={`/product_detail/${props._id}`}
                addStyles={{
                  margin: "10px 0 0 0"
                }}
              />
            </div>
            <div className="button_wrapp">
              <MyButton
                type="bag_link"
                runAction={() => {
                  console.log("added to cart - clicked");
                  props.user.userData.isAuth ?
                    this.props.dispatch(addToCart(props._id))
                  :console.log("user not auth")
                }}
              >
                {" "}
              </MyButton>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return{
    user: state.user
  }
}

export default connect(mapStateToProps)(Card);
