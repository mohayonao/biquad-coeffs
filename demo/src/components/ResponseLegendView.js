import React, { Component, PropTypes } from "react";
import ResponseLegendItem from "./ResponseLegendItem";
import { colors as ColorSet, names as FilterNames } from "../constants/Filters";

export default class ResponseLegendView extends Component {
  static propTypes ={
    filters    : PropTypes.arrayOf(PropTypes.string).isRequired,
    visible    : PropTypes.object.isRequired,
    onItemClick: PropTypes.func.isRequired,
  };

  constructor(...args) {
    super(...args);
    this.onItemClick = ::this.onItemClick;
  }

  onItemClick(name) {
    this.props.onItemClick(name);
  }

  render() {
    const { filters } = this.props;
    const filterElems = filters.map((name, i ) => {
      const mark = this.props.visible[name] ? "■" : "□";

      return (
        <ResponseLegendItem key={ i } mark={ mark } name={ name } color={ ColorSet[name] } onItemClick={ this.onItemClick }>
          <span>{ FilterNames[name] }</span>
        </ResponseLegendItem>
      );
    });

    return (
      <div>{ filterElems }</div>
    );
  }
}
