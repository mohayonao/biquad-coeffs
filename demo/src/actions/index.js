import * as types from "../constants/ActionTypes";

export function changeFilterLib(name) {
  return { type: types.CHANGE_FILTER_LIB, name };
}

export function changeFilterValue(dataType, dataValue) {
  return { type: types.CHANGE_FILTER_VALUE, dataType, dataValue };
}

export function togglePreview() {
  return { type: types.TOGGLE_PREVIEW };
}

export function doneFetchAudio() {
  return { type: types.DONE_FETCH_AUDIO };
}
