import React, { Component } from "react";
import axios from "axios";
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
    axios
      .get(`/api/v1/user/${connection}/${id}`)
      .then(res => {
        console.log("got res", res);
      })
      .catch(err => {
        console.error(err);
        axios.post(`/api/v1/user`, {
          name: profile.name,
          connection: connection,
          id: id,
          email: profile.email
        }).then((res) => {
          console.log('got res', res)
        }).catch((err) => {
          console.error(err)
        })
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
