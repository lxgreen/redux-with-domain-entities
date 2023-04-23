import { configureStore, combineReducers } from "@reduxjs/toolkit";
import schedulings from "./schedulings";

const rootReducer = combineReducers({
  schedulings: schedulings.reducer
});

const store = configureStore({
  reducer: rootReducer
});

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof rootReducer>;

export default store;
