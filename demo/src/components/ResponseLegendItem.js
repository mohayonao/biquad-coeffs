import React, { Component, PropTypes  } from "react";

export default class ResponseLegendItem extends Component {
  static propTypes = {
    children   : PropTypes.any.isRequired,
    mark       : PropTypes.string.isRequired,
    name       : PropTypes.string.isRequired,
    color      : PropTypes.string.isRequired,
    onItemClick: PropTypes.func.isRequired,
  };

  constructor(...args) {
    super(...args);
    this.onItemClick = ::this.onItemClick;
  }

  onItemClick() {
    this.props.onItemClick(this.props.name);
  }

  render() {
    return (
      <span className="legend-item" onClick={ this.onItemClick }>
        <span className="legend-rect" style={{ color: this.props.color }}>{ this.props.mark }</span>
        { this.props.children }
      </span>
    );
  }
}
