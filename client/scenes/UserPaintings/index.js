import React, { Component } from "react";
import { getUser, createUser } from "@api";
import Inner from "../../components/Inner";
import reducePaintingSections from "../../services/reducePaintingSections";
import PaintingList from "../../components/PaintingList";

class UserPaintings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      paintings: []
    };
  }

  setPaintings = (paintings) => {
    this.setState({ paintings: reducePaintingSections(paintings) });
  }

  getPaintings = () => {
    console.log('getPaintings')
    const { user } = this.props;
    const [connection, id] = user.sub.split("|");
    getUser(connection, id)
      .then(res => {
        this.setPaintings(res.data.paintings);
      })
      .catch(err => {
        console.error(err);
        const data = {
          name: user.name,
          connection,
          id,
          email: user.email
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

  componentDidMount() {
    if(this.props.user.sub) this.getPaintings();
  }

  componentDidUpdate(prevProps) {
    if(this.props.user.sub && prevProps.user.sub === this.props.user.sub) return;
    this.getPaintings();
  }

  render() {
    return (
      <div>
        <Inner>
          <h2>My completed paintings</h2>
          <PaintingList paintings={this.state.paintings} />
        </Inner>
      </div>
    );
  }
}

export default UserPaintings;
