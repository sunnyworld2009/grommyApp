import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import drawer from "./drawer";
import user from "./user";
import list from "./list";
import home from "./homeReducer";

export default combineReducers({
  form: formReducer,
  drawer,
  user,
  list,
  home,
});
