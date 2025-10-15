import React, { useState, useEffect } from "react";
import Logo from "../custom/logo";
export default function Landing() {
  const [showLogo, setShowLogo] = useState(true);
  const [moveLogo, setMoveLogo] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
    const timer = setTimeout(() => {
      setMoveLogo(true);
      setTimeout(() => {
        setShowLogo(false);
      }, 1000);
    }, 2500);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, []);
  return (
    <div>
      {showLogo && (
        <div className={`logo-container ${moveLogo ? "move-to-corner" : ""}`}>
          <Logo size={moveLogo ? "small" : "large"} />
          <div className="progress-container">
            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      )}
    </div>
  );
}
