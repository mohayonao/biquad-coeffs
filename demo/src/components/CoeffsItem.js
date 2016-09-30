import React, { Component, PropTypes } from "react";
import classNames from "classnames";
import { names as FilterNames } from "../constants/Filters";

const PACKAGES_LINK = "https://github.com/mohayonao/biquad-coeffs/tree/master/packages";

export default class CoeffsItem extends Component {
  static propTypes = {
    coeffs  : PropTypes.arrayOf(PropTypes.number).isRequired,
    name    : PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
  };

  render() {
    const { coeffs, name, selected } = this.props;
    const href = `${ PACKAGES_LINK }/biquad-coeffs-${ name }`;

    if (coeffs.length === 0) {
      return null;
    }

    const coeffElems = coeffs.map((x, i) => {
      const value = x.toFixed(6) + (i !== (coeffs.length - 1) ? "," : "");

      return (
        <span key={ i }>{ value }</span>
      );
    });

    return (
      <div className={ classNames("coeffs", { selected: selected }) }>
        <label className="coeffs-label">
          <a href={ href }>{ FilterNames[name] }</a>
        </label>
        <span className="coeffs-item">{ coeffElems }</span>
      </div>
    );
  }
}
