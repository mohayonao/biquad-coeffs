import React, { Component, PropTypes } from "react";

export default class UISelectBox extends Component {
  static propTypes = {
    dataType : PropTypes.string.isRequired,
    dataValue: PropTypes.string.isRequired,
    onChange : PropTypes.func.isRequired,
    options  : PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  };

  constructor(...args) {
    super(...args);
    this.onChange = ::this.onChange;
  }

  onChange(e) {
    this.props.onChange(this.props.dataType, e.target.value);
  }

  render() {
    const { dataValue, options } = this.props;
    const optionElems = options.map(([ value, name ], i) => {
      return (
        <option key={ i } value={ value }>{ name }</option>
      );
    });

    return (
      <select className="form-control" value={ dataValue } onChange={ this.onChange }>
        { optionElems }
      </select>
    );
  }
}
