import React from "react";
import DashHeader from "../components/DashHeader";
import { AddFriend } from "../components/Dashboard/AddFriends";
import Middle from "../components/Dashboard/MiddleDashboard";
import { instance } from "../utils/AxiosConfig";
import { userActionCreator } from "../redux/actionCreator/userAction";
import { store } from "../redux/store";
import Friend from "../components/Dashboard/popups/Friend";
import "../styles/Dashboard.css";
import AddExpense from "../components/Dashboard/popups/addExpense";
import SettleUp from "../components/Dashboard/popups/settleUp";

export class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showFriend: false, showExp: false, settleUp: false };
  }
  // To find which user is logged in
  alwaysRun(username) {
    console.log("this is username ...........", username);
  }

  componentDidMount() {
    instance
      .post("/getData", { username: localStorage.username })
      .then((resp) => {
        console.log("this is response", resp.data.user);
        var action = userActionCreator(resp.data.user, "AddUser");
        store.dispatch(action);
      });
  }
  // To display Add Friend Popup
  showFriend() {
    this.setState({ ...this.state, showFriend: !this.state.showFriend });
    console.log(this.state.showFriend);
  }
  // To display Add Add Expense Popup
  showExpense() {
    this.setState({ ...this.state, showExp: !this.state.showExp });
    console.log(this.state.showExp);
  }
  // To display Add Settle up Popup
  settle() {
    this.setState({ ...this.state, settleUp: !this.state.settleUp });
    console.log(this.state.settleUp);
  }
  render() {
    return (
      <div>
        <DashHeader />

        {this.state.showFriend && (
          <Friend friend={this.showFriend.bind(this)} />
        )}
        {this.state.showExp && (
          <AddExpense friend={this.showExpense.bind(this)} />
        )}
        {this.state.settleUp && <SettleUp friend={this.settle.bind(this)} />}

        <div className="flex">
          <AddFriend friend={this.showFriend.bind(this)} />
          <Middle
            friend={this.showExpense.bind(this)}
            settle={this.settle.bind(this)}
          />
        </div>
      </div>
    );
  }
}
