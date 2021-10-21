import { combineReducers } from "redux";
import { dataReducer } from "./dataReducer";

const rootReducer = combineReducers({
  AppData:dataReducer
});

export default rootReducer;
