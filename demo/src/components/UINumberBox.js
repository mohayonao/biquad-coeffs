import React, { Component, PropTypes } from "react";

export default class UINumberBox extends Component {
  static propTypes = {
    dataType : PropTypes.string.isRequired,
    dataValue: PropTypes.number.isRequired,
    onChange : PropTypes.func.isRequired,
    min      : PropTypes.number.isRequired,
    max      : PropTypes.number.isRequired,
    step     : PropTypes.number.isRequired,
  };

  constructor(...args) {
    super(...args);
    this.onChange = ::this.onChange;
  }

  onChange(e) {
    this.props.onChange(this.props.dataType, +e.target.value);
  }

  render() {
    const { min, max, step, dataValue } = this.props;

    return (
      <input className="form-control" type="number" min={ min } max={ max } step={ step } value={ dataValue } onChange={ this.onChange } />
    );
  }
}
