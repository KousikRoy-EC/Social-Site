import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider, useSelector } from "react-redux";
import reduxStore from "./redux";
import { BrowserRouter ,Route ,Routes} from "react-router-dom";
ReactDOM.render(
  <Provider store={reduxStore}>
  <BrowserRouter>
  <Routes>
  <Route path="*" element={<App/>}/>
  </Routes>
  </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

