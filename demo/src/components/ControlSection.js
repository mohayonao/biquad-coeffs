import React, { Component, PropTypes } from "react";
import LabeledElement from "./LabeledElement";
import UISelectBox from "./UISelectBox";
import UINumberBox from "./UINumberBox";
import { SAMPLERATE } from "../constants";
import { libs as FilterLibs, types as FilterTypes } from "../constants/Filters";

const FilterLibOptions = FilterLibs.map(items => [ items[0], `biquad-coeffs-${ items[0] }` ]);
const FilterTypeOptions = FilterTypes.map(item => [ item, item ]);

export default class ControlSection extends Component {
  static propTypes = {
    actions       : PropTypes.object.isRequired,
    previewLib    : PropTypes.string.isRequired,
    isPlaying     : PropTypes.bool.isRequired,
    filterParams  : PropTypes.object.isRequired,
    doneFetchAudio: PropTypes.bool.isRequired,
  };

  constructor(...args) {
    super(...args);
    this.onButtonClick       = ::this.onButtonClick;
    this.onChangeFilterLib   = ::this.onChangeFilterLib;
    this.onChangeFilterValue = ::this.onChangeFilterValue;
  }

  onButtonClick() {
    this.props.actions.togglePreview();
  }

  onChangeFilterLib(dateType, dataValue) {
    this.props.actions.changeFilterLib(dataValue);
  }

  onChangeFilterValue(dataType, dataValue) {
    this.props.actions.changeFilterValue(dataType, dataValue);
  }

  render() {
    const { isPlaying, previewLib, doneFetchAudio } = this.props;
    const { type, freq, q, gain } = this.props.filterParams;
    const buttonClassName = `from-control btn btn-${ isPlaying ? "success" : "default" }`;
    const freqStep = toIntelliStep(freq);
    const qStep    = toIntelliStep(q);
    const gainStep = 1;

    return (
      <section>
        <div className="row">
          <div className="col-xs-1">
            <LabeledElement labelName="Preview">
              <button className={ buttonClassName } disabled={ !doneFetchAudio } onClick={ this.onButtonClick }>
                <span className="glyphicon glyphicon-play"></span>
              </button>
            </LabeledElement>
          </div>
          <div className="col-xs-3">
            <LabeledElement labelName="LibName">
              <UISelectBox dataType="previewLib" dataValue={ previewLib } onChange={ this.onChangeFilterLib } options={ FilterLibOptions } />
            </LabeledElement>
          </div>
          <div className="col-xs-2">
            <LabeledElement labelName="Type">
              <UISelectBox dataType="type" dataValue={ type } onChange={ this.onChangeFilterValue } options={ FilterTypeOptions } />
            </LabeledElement>
          </div>
          <div className="col-xs-2">
            <LabeledElement labelName="Frequency">
              <UINumberBox dataType="freq" dataValue={ freq } min={ 10 } max={ SAMPLERATE/2 } step={ freqStep } onChange={ this.onChangeFilterValue } />
            </LabeledElement>
          </div>
          <div className="col-xs-2">
            <LabeledElement labelName="Q">
              <UINumberBox dataType="q" dataValue={ q } min={ 0 } max={ 1000 } step={ qStep } onChange={ this.onChangeFilterValue } />
            </LabeledElement>
          </div>
          <div className="col-xs-2">
            <LabeledElement labelName="Gain">
              <UINumberBox dataType="gain" dataValue={ gain } min={ -40 } max={ 40 } step={ gainStep } onChange={ this.onChangeFilterValue } />
            </LabeledElement>
          </div>
        </div>
      </section>
    );
  }
}

function toIntelliStep(value) {
  const n10 = Math.floor(Math.log(value) / Math.log(10));
  return Math.pow(10, n10) / 10;
}
