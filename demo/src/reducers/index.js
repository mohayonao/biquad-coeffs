import { libs as FilterLibs } from "../constants/Filters";
import * as types from "../constants/ActionTypes";
import setFilterResponse from "./setFilterResponse";

const initState = {
  isPlaying: false,
  doneFetchAudio: false,
  previewLib: FilterLibs[0][0],
  filterParams: { type: "lowpass", freq: 350, q: 1, gain: 0 },
  filterData  : {},
};

export default (state = initState, action) => {
  switch (action.type) {
  case "@@redux/INIT":
    state = { ...state };
    state = setFilterResponse(state);
    return state;
  case types.CHANGE_FILTER_LIB:
    return { ...state, previewLib: action.name };
  case types.CHANGE_FILTER_VALUE:
    state = { ...state, filterParams: { ...state.filterParams, [action.dataType]: action.dataValue } };
    state = setFilterResponse(state);
    return state;
  case types.TOGGLE_PREVIEW:
    return { ...state, isPlaying: !state.isPlaying };
  case types.DONE_FETCH_AUDIO:
    return { ...state, doneFetchAudio: true };
  }
  return state;
};
