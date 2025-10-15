import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./storeslice";

const store = configureStore({
  reducer: rootReducer,
});

export default store;