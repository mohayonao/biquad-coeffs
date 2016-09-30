import React, { Component, PropTypes } from "react";
import LabeledElement from "./LabeledElement";
import CoeffsItem from "./CoeffsItem";

export default class CoeffsSection extends Component {
  static propTypes = {
    previewLib: PropTypes.string.isRequired,
    filterData: PropTypes.object.isRequired,
  };

  render() {
    const { previewLib, filterData } = this.props;
    const elems = Object.keys(filterData).map((name, i) => {
      const coeffs = filterData[name].coeffs;
      const selected = previewLib === name;

      return (
        <CoeffsItem key={ i } coeffs={ coeffs } name={ name } selected={ selected } />
      );
    });

    return (
      <section>
        <LabeledElement labelName="Coefficients">{ elems }</LabeledElement>
      </section>
    );
  }
}
