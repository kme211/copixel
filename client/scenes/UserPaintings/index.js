import React, { Component } from "react";
import { getUser, createUser } from "@api";
import Inner from "../../components/Inner";

class UserPaintings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      paintings: []
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.auth.userProfile !== prevState.auth.userProfile) {
      this.getUser(this.state.auth.userProfile);
    }
  }

  getUser(profile) {
    console.log("getUser");
    const [connection, id] = profile.sub.split("|");
    getUser(connection, id)
      .then(res => {
        console.log("got res", res);
      })
      .catch(err => {
        console.error(err);
        const data = {
          name: profile.name,
          connection,
          id,
          email: profile.email
        };
        createUser(data)
          .then(res => {
            console.log("got res", res);
          })
          .catch(err => {
            console.error(err);
          });
      });
  }

  render() {
    return (
      <div>
        <Inner>
          <h2>User Paintings</h2>
          <ul>
            {this.state.paintings.map(painting => <li>{painting._id}</li>)}
          </ul>
        </Inner>
      </div>
    );
  }
}

export default UserPaintings;
