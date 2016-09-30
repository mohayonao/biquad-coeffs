import React, { Component, PropTypes } from "react";

export default class LabeledElement extends Component {
  static propTypes = {
    children : PropTypes.any.isRequired,
    labelName: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div>
        <h4>
          { this.props.labelName }
        </h4>
        { this.props.children }
      </div>
    );
  }
}
