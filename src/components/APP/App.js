import React, { useState, useEffect } from "react";
// import { Routes, Route, Navigate, HashRouter } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layoout from "../layout/layout";
import Home from "../pages/home";
import Aboutus from "../../components/pages/About";
import Services from "../../components/pages/Services";
import Gallery from "../../components/pages/Gallery";
import Contactus from "../../components/pages/Contact";

import Admin from "../../components/pages/admin";
import Login from "../../components/pages/Login";
import NotFound from "../../components/pages/404";

import { Provider } from "react-redux";
import store from "../store/store";

import ProtectedRoute from "../ProtectedRoute";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route element={<Layoout />}>
            <Route path="/Home" element={<Home />} />
            <Route path="/About" element={<Aboutus />} />
            <Route path="/Services" element={<Services />} />
            <Route path="/Gallery" element={<Gallery />} />
            <Route path="/Contact" element={<Contactus />} />
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="/Login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
          <Route
            path="/Admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
