import { combineReducers } from "redux";
import { authentication } from "./authentication.reducer";
import env from "./env";

export default combineReducers({ env, authentication });