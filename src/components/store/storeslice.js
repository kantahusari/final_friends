import { createSlice, combineReducers } from "@reduxjs/toolkit";
// ---------------------------------- Tabs Slice ----------------------------------
const TOPTABS = ["Home", "Our Company", "Services", "Gallery", "Contact Us", "Login"];
const tabSlice = createSlice({
  name: "tabs",
  initialState: {
    tabs: TOPTABS,
    activeTab: "Home",
  },
  reducers: {
    loadTabs(state, action) {
      if (action.payload) {
        return {
          ...state,
          ...action.payload,
        };
      }
      return state;
    },
  },
});
// ---------------------------------- Authentication Slice ----------------------------------
const initialState = {
  user: null,
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem("token");
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

const message_slice = createSlice({
  name: "message",
  initialState: {
    count: 0,
  },
  reducers: {
    get_count(state, action) {
      if (action.payload) {
        return {
          ...state,
          ...action.payload,
        };
      }
      return state;
    },
  },
});

const guest_image_slice = createSlice({
  name: "images",
  initialState: {
    all: [],
    filtered: [],
  },
  reducers: {
    get_images(state, action) {
      if (action.payload) {
        return {
          ...state,
          ...action.payload,
        };
      }
      return state;
    },
  },
});

const image_count_slice = createSlice({
  name: "image_count",
  initialState: {
    imagecount: 0,
  },
  reducers: {
    get_image_count(state, action) {
      if (action.payload) {
        return {
          ...state,
          ...action.payload,
        };
      }
      return state;
    },
  },
});

const rootReducer = combineReducers({
  tabs: tabSlice.reducer,
  auth: authSlice.reducer,
  message: message_slice.reducer,
  images: guest_image_slice.reducer,
  image_count: image_count_slice.reducer,
});

export const { loadTabs } = tabSlice.actions;
export const { loginStart, loginSuccess, loginFailure, logout, clearError } = authSlice.actions;
export const { get_count } = message_slice.actions;
export const { get_images } = guest_image_slice.actions;
export const { get_image_count } = image_count_slice.actions;

export default rootReducer;
