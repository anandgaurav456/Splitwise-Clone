import React from "react";
import { instance } from "../utils/AxiosConfig";
import { withRouter } from "react-router-dom";
import { userActionCreator } from "../redux/actionCreator/userAction";
import { store } from "../redux/store";

class AuthComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: undefined,
    };
  }
  componentWillMount() {
    const jwt = localStorage.getItem("jwtToken");
    if (!jwt) {
      this.props.history.push("/login");
    }

    instance
      .get("/getUser", { headers: { Authorization: `Bearer ${jwt}` } })
      .then((res) => {
        // this.state.user = res.data.userdata.doc;
        localStorage.username = res.data.userdata.doc.username;
        var user = res.data.userdata.doc;

        this.setState({ user: user });

        var action = userActionCreator(user, "AddUser");
        store.dispatch(action);
      })
      .catch((err) => {
        localStorage.removeItem("jwtToken");
        this.props.history.push("/login");
      });
  }

  render() {
    if (this.state.user === undefined) {
      return (
        <div>
          <h1>loading..........</h1>
        </div>
      );
    }

    return <div>{this.props.children}</div>;
  }
}

export default withRouter(AuthComponent);
