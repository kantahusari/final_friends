import { useCallback } from "react";
export default function Communication() {
  return useCallback((type) => {
    if (type === "phone") {
      window.location.href = `tel:+17808623557`;
    }
    if (type === "email") {
      window.location.href = `mailto:friendsrenos24@gmail.com`;
    }
    if (type === "fb") {
      window.open(`https://www.facebook.com/`, "_blank");
    }
    if (type === "ig") {
      window.open(`https://www.instagram.com/`, "_blank");
    }
  }, []);
}
