import React from "react";
import { connect } from "react-redux";
import "../../styles/Dashboard.css";
var exp = 0;
var owe = [];
var owed = [];
function calculate(props) {
  exp = 0;
  owe = [];
  owed = [];
  if (props.user.expensis) {
    props.user.expensis.forEach((element) => {
      if (element.data) {
        exp += parseInt(element.data.ammount);
        if (element.data.ammount > 0) {
          // console.log("element.data.ammount>0");
          owed.push(element);
          // console.log(owed);
        } else if (element.data.ammount < 0) {
          // console.log("element.data.ammount<0");
          owe.push(element);
          // console.log(owe);
        }
      }
    });
  }
}

const Middle = (props) => {
  return (
    <div className="Middle">
      {/* Used for calculation of Amount Owed */}
      {calculate(props)}

      <div className="MidDash">
        <div className="DashHeader">
          <h3>Dashboard</h3>
          <button className="btn float-right settle" onClick={props.settle}>
            Settle up
          </button>
          <button className="btn float-right expense" onClick={props.friend}>
            Add an expense
          </button>
        </div>

        <div className="total">
          <div className="fitting">
            <label htmlFor="">total balance</label>
            <p className="green">$ {exp}</p>
          </div>
          <div className="fitting">
            <label htmlFor="">you owe</label>
            <p style={{ color: "red" }}>$ {exp < 0 ? exp : 0}</p>
          </div>
          <div className="fitting">
            <label htmlFor="">you are owed</label>
            <p className="green">$ {exp > 0 ? exp : 0}</p>
          </div>
        </div>
      </div>
      <div className="totalCollection">
        <div>
          <label htmlFor="">YOU OWE</label>
        </div>
        <div>
          <label htmlFor="" className="float-right mr-4">
            YOU ARE OWED
          </label>
        </div>
      </div>
      <div className="flex">
        <div className="float-left ml-3 borders">
          <ul>
            {owe.length === 0 ? (
              <li>You do not owe anything</li>
            ) : (
              owe.map((value) => (
                <li>
                  <img
                    className="imgs"
                    src={require("../../images/person-profile.png")}
                    alt=""
                    align="left"
                  />
                  <div className="inline">
                    <h5>{value.name}</h5>
                    <span>you owe$ {-value.data.ammount}</span>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>

        <div>
          <ul>
            {owed.length === 0 ? (
              <li>You do not owe anything</li>
            ) : (
              owed.map((value) => (
                // console.log(value)
                <li>
                  <img
                    className="imgs"
                    src={require("../../images/person-profile.png")}
                    alt=""
                    align="left"
                  />
                  <div className="inline">
                    <h5>{value.name}</h5>
                    <span>owes you $ {value.data.ammount}</span>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const fn = connect(mapStateToProps);
export default fn(Middle);
