import React, { Component } from "react";
import ImageLightbox from "../utils/ImageLightBox";

class ProdImg extends Component {
  state = {
    lightbox: false,
    imagePos: 0,
    lightboxImages: []
  };

  componentDidMount() {
    if (this.props.prodDetail.images.length > 0) {
      let lightboxImages = [];

      this.props.prodDetail.images.forEach(item => {
        lightboxImages.push(item.url);
      });

      this.setState({
        lightboxImages
      });
    }
  }

  renderCardImage = images =>
    images.length > 0 ? images[0].url : `/images/not_avail.png`;

  handleLightBox = pos => {
    if (this.state.lightboxImages.length > 0) {
      this.setState({
        lightbox: true,
        imagePos: pos
      });
    }
  };

  handleLightBoxClose = () => {
    this.setState({
      lightbox: false
    });
  };

  showThumbs = () =>
    this.state.lightboxImages.map((image, i) =>
      i > 0 ? (
        <div
          key={i}
          onClick={() => this.handleLightBox(i)}
          className="thumb"
          style={{ background: `url(${image}) no-repeat` }}
        />
      ) : null
    );

  render() {
    const { prodDetail } = this.props; //another way to alias
    return (
      <div className="product_image_container">
        <div className="main_pic">
          <div
            style={{
              background: `url(${this.renderCardImage(
                prodDetail.images
              )}) no-repeat`
            }}
            onClick={() => this.handleLightBox(0)}
          />
        </div>
        <div className="main_thumbs">{this.showThumbs(prodDetail)}</div>
        {this.state.lightbox ? (
          <ImageLightbox
            id={prodDetail.id}
            images={this.state.lightboxImages}
            open={this.state.open}
            pos={this.state.imagePos}
            onClose={() => this.handleLightBoxClose()}
          />
        ) : null}
      </div>
    );
  }
}

export default ProdImg;
