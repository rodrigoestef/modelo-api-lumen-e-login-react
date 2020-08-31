import React from "react";
import ReactDOM from "react-dom";
import Context from './context/userContext';
import Router from "./router";

import 'bootstrap'

ReactDOM.render(<Context><Router/></Context>,document.querySelector('#App'))