import React, { Component } from "react";
import { connect} from "react-redux";
import ControlSection  from "../components/ControlSection";
import ResponseSection from "../components/ResponseSection";
import CoeffsSection from "../components/CoeffsSection";

class App extends Component {
  render() {
    return (
      <div>
        <ControlSection { ...this.props } />
        <ResponseSection { ...this.props } />
        <CoeffsSection { ...this.props } />
      </div>
    );
  }
}

export default connect(state => state)(App);
