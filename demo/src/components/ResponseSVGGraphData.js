import React, { Component, PropTypes } from "react";
import { toX, toY } from "../utils";
import { FREQ_BINS } from "../constants";

function toPoints(response) {
  return response
    .map((db, i) => [ toX(FREQ_BINS[i]), toY(db) ])
    .filter(pt => pt.every(Number.isFinite));
}

export default class ResponseSVGGraphData extends Component {
  static propTypes = {
    color      : PropTypes.string.isRequired,
    strokeWidth: PropTypes.number.isRequired,
    data       : PropTypes.arrayOf(PropTypes.number).isRequired,
  };

  render() {
    const { color, strokeWidth, data } = this.props;
    const points = toPoints(data);

    if (points.length === 0) {
      return null;
    }

    const d = points.map((pt, i) => (i === 0 ? "M" : "L") + pt.join(",")).join(" ");

    return (
      <path stroke={ color } strokeWidth={ strokeWidth } fill="none" strokeLinejoin="round" d={ d } />
    );
  }
}
