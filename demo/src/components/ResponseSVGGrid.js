import React, { Component, PropTypes } from "react";
import { WIDTH, HEIGHT } from "../constants";
import { toX, toY } from "../utils";

const FREQ_GRID = [ 100, 1000, 10000 ];
const DB_GRID = [ 24, 18, 12, 6, -6, -12, -18, -24 ];

export default class ResponseSVGGrid extends Component {
  static propTypes = {
    filterParams: PropTypes.object.isRequired,
  };

  render() {
    const freqX = toX(Math.max(1e-4, this.props.filterParams.freq));
    const zeroY = toY(0);
    const xGrid = FREQ_GRID.map((fr, i) => {
      const x = toX(fr);

      return (
        <line key={ i } x1={ x } y1="0" x2={ x } y2={ HEIGHT } stroke="#bdc3c7" strokeWidth="1" fill="none" />
      );
    });
    const yGrid = DB_GRID.map((db, i) => {
      const y = toY(db);

      return (
        <text key={ i } x={ WIDTH - 5 } y={ y } fontSize="12" fill="#95a5a6" textAnchor="end" dominantBaseline="middle">{ db }</text>
      );
    });

    yGrid.push(
      <line key={ -1 } x1="0" y1={ zeroY } x2={ WIDTH } y2={ zeroY } stroke="#bdc3c7" strokeWidth="1" fill="none" />
    );
    xGrid.push(
      <line key={ -1 } x1={ freqX } y1="0" x2={ freqX } y2={ HEIGHT } stroke="#95a5a6" strokeWidth="1" fill="none" strokeDasharray="2, 2" />
    );

    return (<g>{ xGrid }{ yGrid }</g>);
  }
}
