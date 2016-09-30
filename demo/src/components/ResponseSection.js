import React, { Component, PropTypes } from "react";
import fromPairs from "lodash.frompairs";
import ResponseSVGGraphData from "./ResponseSVGGraphData";
import ResponseSVGGrid from "./ResponseSVGGrid";
import ResponseLegendView from "./ResponseLegendView";
import { WIDTH, HEIGHT } from "../constants";
import { colors as ColorSet } from "../constants/Filters";

export default class ResponseSection extends Component {
  static propTypes = {
    actions   : PropTypes.object.isRequired,
    previewLib: PropTypes.string.isRequired,
    filterData: PropTypes.object.isRequired,
  };

  constructor(...args) {
    super(...args);
    this.state = { visible: fromPairs(Object.keys(ColorSet).map(name => [ name, true ])) };
    this.onLegendSelect = ::this.onLegendSelect;
  }

  onLegendSelect(name) {
    this.setState({ visible: { ...this.state.visible, [name]: !this.state.visible[name] } });
  }

  render() {
    const { previewLib, filterData } = this.props;
    const { visible } = this.state;
    const filters = Object.keys(filterData).filter(name => filterData[name].response.length);
    const graphs = filters.filter((name) => {
      return this.state.visible[name];
    }).map((name, i) => {
      const strokeWidth = previewLib === name ? 4 : 2;

      return (
        <ResponseSVGGraphData key={ i } color={ ColorSet[name] } strokeWidth={ strokeWidth } data={ filterData[name].response } />
      );
    });

    return (
      <section className="svg-container">
        <svg viewBox={ `0 0 ${ WIDTH } ${ HEIGHT }` }>
          <ResponseSVGGrid { ...this.props } />
          { graphs }
        </svg>
        <ResponseLegendView filters={ filters } visible={ visible } onItemClick={ this.onLegendSelect }/>
      </section>
    );
  }
}
