// src/redux/selectors.js
import { createSelector } from "reselect";

// Basic selector to get the entire state
const selectState = (state) => state;

// Memoized selector to get the user object from the state
export const selectUser = createSelector(
  [selectState], // Dependencies: we are selecting the whole state
  (state) => state.user // Returns the user from the state
);
