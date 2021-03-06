import React, { Component } from "react";
import { connect } from "react-redux";
import { auth } from "../actions/user_actions";
import CircularProgress from "@material-ui/core/CircularProgress";
import Loading from "../components/loading_screen/Loading";

export default function(RouteComponent, reload, adminRoute = null) {
  class AuthenticationCheck extends Component {
    state = {
      loading: true
    };

    componentDidMount() {
      this.props.dispatch(auth()).then(response => {
        let user = this.props.user.userData;
        //console.log(user);
        // if not authenticated then boot to register_login
        if (!user.isAuth) {
          if (reload) {
            this.props.history.push("/register_login");
          }
        } else {
          if (adminRoute && !user.isAdmin) {
            this.props.history.push("/user/dashboard");
          } else {
            if (reload === false) {
              //false means public route
              this.props.history.push("/user/dashboard");
            }
          }
        }

        this.setState({ loading: false });
      });
    }

    render() {
      if (this.state.loading) {
        return <Loading />;
      } else {
        return <RouteComponent {...this.props} user={this.props.user} />;
      }
    }
  }

  function mapStateToProps(state) {
    return {
      user: state.user
    };
  }

  return connect(mapStateToProps)(AuthenticationCheck);
}
