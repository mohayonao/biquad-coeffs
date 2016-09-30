import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, bindActionCreators } from "redux";
import App from "./containers/App";
import PreviewPlayer from "./audio/PreviewPlayer";
import reducers from "./reducers";
import * as actionCreators from "./actions";

window.AudioContext = window.AudioContext || window.webkitAudioContext;
window.OfflineAudioContext = window.OfflineAudioContext || window.webkitOfflineAudioContext;

window.addEventListener("DOMContentLoaded", () => {
  const store = createStore(reducers);
  const actions = bindActionCreators(actionCreators, store.dispatch);
  const audioContext = new AudioContext();
  const player = new PreviewPlayer(audioContext, actions);

  store.subscribe(() => {
    player.setState(store.getState());
  });

  ReactDOM.render(
    <Provider store={ store }>
      <App actions={ actions } />
    </Provider>
    ,document.getElementById("app")
  );
});
