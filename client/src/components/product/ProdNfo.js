import React from "react";
import MyButton from "../utils/Button";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faTruck from "@fortawesome/fontawesome-free-solid/faTruck";
import faCheck from "@fortawesome/fontawesome-free-solid/faCheck";
import faTimes from "@fortawesome/fontawesome-free-solid/faTimes";

const ProdNfo = props => {
  const prodDetail = props.prodDetail;

  const showProdTags = prodDetail => (
    <div className="product_tags">
      {prodDetail.shipping ? (
        <div className="tag">
          <div>
            <FontAwesomeIcon icon={faTruck} />
          </div>
          <div className="tag_text">
            <div>Free shipping</div>
            <div>and returns</div>
          </div>
        </div>
      ) : null}

      {prodDetail.available ? (
        <div className="tag">
          <div>
            <FontAwesomeIcon icon={faCheck} />
          </div>
          <div className="tag_text">
            <div>Available</div>
            <div>In stock</div>
          </div>
        </div>
      ) : (
        <div className="tag">
          <div>
            <FontAwesomeIcon icon={faTimes} />
          </div>
          <div className="tag_text">
            <div>Not available</div>
            <div>Preorders only</div>
          </div>
        </div>
      )}
    </div>
  );

  const showProdActions = prodDetail => (
    <div className="product_actions">
      <div className="price">$ {prodDetail.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</div>
      <div className="cart">
        <MyButton
          type="add_to_cart_link"
          runAction={() => {
            props.addToCart(prodDetail._id);
          }}
        />
      </div>
    </div>
  );

  const showProdSpecifications = prodDetail => (
    <div className="product_speciifications">
      <h2>Specifications</h2>
      <div>
        <div>Frets: {prodDetail.frets}</div>
        <div>Wood: {prodDetail.wood.name}</div>
      </div>
    </div>
  );

  return (
    <div>
      <h1>
        {prodDetail.brand.name}
        {prodDetail.name}
      </h1>
      <p>{prodDetail.description}</p>
      {showProdTags(prodDetail)}
      {showProdActions(prodDetail)}
      {showProdSpecifications(prodDetail)}
    </div>
  );
};

export default ProdNfo;
