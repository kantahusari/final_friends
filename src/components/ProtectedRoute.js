import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { authService } from "../components/serviceworker/authService";
import { loginSuccess, loginFailure } from "../components/store/storeslice";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const verifyToken = async () => {
      if (token && !isAuthenticated) {
        try {
          const response = await authService.verifyToken();
          dispatch(loginSuccess(response));
        } catch (error) {
          dispatch(loginFailure(error.response?.data?.message || "Token verification failed"));
        }
      }
    };

    verifyToken();
  }, [token, isAuthenticated, dispatch]);

  if (!token) {
    return <Navigate to="/Login" replace />;
  }

  if (token && !isAuthenticated) {
    return <div>Loading...</div>;
  }

  return children;
};

export default ProtectedRoute;
