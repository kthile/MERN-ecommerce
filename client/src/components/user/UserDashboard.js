import React from "react";
import UserLayout from "../../hoc/UserLayout";
import MyButton from "../utils/Button";
import UserHistoryBlock from "../utils/User/UserHistoryBlock";

const UserDashboard = props => {
  return (
    <UserLayout>
      <div>
        <div className="user_nfo_panel">
          <h1>User Information</h1>
          <div>
            <span>First Name: {props.user.userData.name}</span>
            <span>Last Name: {props.user.userData.lastname}</span>
            <span>Email: {props.user.userData.email}</span>
          </div>
          <MyButton
            type="default"
            title="Edit account info"
            linkTo="/user/user_profile"
          />
        </div>

        {props.user.userData.history ? (
          <div className="user_nfo_panel">
            <h1>Purchase History</h1>
            <div className="user_product_block_wrapper">
              <UserHistoryBlock 
                history={props.user.userData.history}
              />
            </div>
          </div>
        ) : null}
      </div>
    </UserLayout>
  );
};

export default UserDashboard;
