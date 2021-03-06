import React, { Component } from "react";
import Header from "../components/header_footer/Header";
import Footer from "../components/header_footer/Footer";
import { connect } from "react-redux";
import { getSiteData } from "../actions/site_actions";

class Layout extends Component {
  componentDidMount() {
    if (Object.keys(this.props.site).length === 0) {
      this.props.dispatch(getSiteData());
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className="page_container">{this.props.children}</div>
        <Footer data={this.props.site} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    site: state.site
  };
};

export default connect(mapStateToProps)(Layout);
