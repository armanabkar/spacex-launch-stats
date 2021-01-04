import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import LaunchItem from "./LaunchItem";
import MissionKey from "./MissionKey";

const LAUNCHES_QUERY = gql`
  query LaunchesQuery {
    launches {
      flight_number
      mission_name
      launch_date_local
      launch_success
    }
  }
`;

class Launches extends Component {
  state = {
    showMore: false,
  };

  render() {
    return (
      <>
        <div className="launches">
          <h1 className="display-4 my-3">Launches</h1>
          <MissionKey />
        </div>
        <Query query={LAUNCHES_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return <h4 className="loading">Loading...</h4>;
            if (error) console.log(error);

            return (
              <>
                {this.state.showMore ? (
                  <>
                    {data.launches
                      .sort((a, b) =>
                        a.launch_date_local > b.launch_date_local ? -1 : 1
                      )
                      .map((launch) => (
                        <LaunchItem
                          key={launch.flight_number}
                          launch={launch}
                        />
                      ))}
                  </>
                ) : (
                  <>
                    {data.launches
                      .sort((a, b) =>
                        a.launch_date_local > b.launch_date_local ? -1 : 1
                      )
                      .slice(0, 15)
                      .map((launch) => (
                        <LaunchItem
                          key={launch.flight_number}
                          launch={launch}
                        />
                      ))}
                    <p
                      onClick={() => this.setState({ showMore: true })}
                      className="show-more"
                    >
                      Show More
                    </p>
                  </>
                )}
              </>
            );
          }}
        </Query>
      </>
    );
  }
}

export default Launches;
