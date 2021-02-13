import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Launches from "./components/Launches";
import Launch from "./components/Launch";

const client = new ApolloClient({
  uri: "/graphql",
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div className="container">
            <Link to={`/`}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/d/de/SpaceX-Logo.svg"
                alt="SpaceX"
                style={{
                  width: 280,
                  display: "block",
                  margin: "0.6rem auto 1.1rem auto",
                }}
              />
            </Link>
            <hr className="appBar" />
            <Route exact path="/" component={Launches} />
            <Route exact path="/launch/:flight_number" component={Launch} />
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
