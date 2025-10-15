import React, { useEffect, useState, useRef, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import NAV from "../navigation/navigation";
import Footer from "../footer/footer";
import WhatsAppChat from "../custom/WhatsAppChat ";
export default function Layout() {
  return (
    <Fragment>
      <NAV />
      <Outlet />
      <Footer />
      <WhatsAppChat />
    </Fragment>
  );
}
