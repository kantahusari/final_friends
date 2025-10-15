// pages/Login.js
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import info from "../custom/info";
import { useNavigate } from "react-router-dom";
import { loginStart, loginSuccess, loginFailure, clearError } from "../store/storeslice";
import { authService } from "../serviceworker/authService";
import { loadTabs } from "../store/storeslice";

const Login = () => {
  const date = new Date();
  const year = date.getFullYear();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [lockUntil, setLockUntil] = useState(null);

  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/Admin", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const checkLock = () => {
      const now = Date.now();
      if (lockUntil && now < lockUntil) {
        return true;
      }
      if (lockUntil && now >= lockUntil) {
        setLockUntil(null);
        setAttempts(0);
      }
      return false;
    };

    if (checkLock()) {
      const remaining = Math.ceil((lockUntil - Date.now()) / 1000 / 60);
      dispatch(loginFailure(`Account locked. Try again in ${remaining} minutes`));
    }
  }, [lockUntil, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (lockUntil && Date.now() < lockUntil) {
      return;
    }

    if (!credentials.username || !credentials.password) {
      dispatch(loginFailure("Please fill in all fields"));
      return;
    }

    dispatch(clearError());
    dispatch(loginStart());

    try {
      const response = await authService.login(credentials);
      dispatch(loginSuccess(response));
      navigate("/Admin", { replace: true });
    } catch (error) {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      if (newAttempts >= 5) {
        const lockTime = Date.now() + 30 * 60 * 1000; // 30 minutes
        setLockUntil(lockTime);
        dispatch(loginFailure("Too many failed attempts. Account locked for 30 minutes"));
      } else {
        dispatch(loginFailure(error.response?.data?.message || "Login failed"));
      }
    }
  };

  const remainingLockTime = lockUntil ? Math.ceil((lockUntil - Date.now()) / 1000 / 60) : 0;

  return (
    <div className="page login">
      <div className="page_header company">
        <main>{info.company}</main>
      </div>
      <br />
      <section className="login-form">
        <div className="container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" className="form-control" id="username" placeholder="Enter your username" value={credentials.username} onChange={(e) => setCredentials({ ...credentials, username: e.target.value })} disabled={!!lockUntil} required />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type={showPassword ? "text" : "password"} className="form-control" id="password" placeholder="Enter your password" value={credentials.password} onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} disabled={!!lockUntil} required />
            </div>

            <button type="button" className="btn btn-primary show-password-btn" id="togglePassword" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "Hide" : "Show"} Password
            </button>
            <br />
            <br />
            {lockUntil && <div className="lock-message">Account locked. Try again in {remainingLockTime} minutes</div>}
            <button type="submit" className="btn btn-primary login-btn" disabled={loading || !!lockUntil}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
        <br />
        <button className="btn btn-secondary" onClick={() => navigate("/Home")}>
          Home Page
        </button>
      </section>
    </div>
  );
};

export default Login;
