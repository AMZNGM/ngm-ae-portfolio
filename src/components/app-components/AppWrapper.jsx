import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "lenis";
import Navbar from "@/components/Navbar.jsx";

const AppWrapper = ({ children }) => {
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  });

  const location = useLocation();
  const validRoutes = ["/"];
  const isValidRoute = validRoutes.some(
    (route) =>
      location.pathname === route ||
      (route.includes("/:") &&
        location.pathname.startsWith(route.split("/:")[0]) &&
        location.pathname !== route.split("/:")[0])
  );
  const shouldShowNavbar = isValidRoute && !["/*"].includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      {children}
      <span className="absolute bottom-1 right-2 text-main/40 text-xs">Made by NGM</span>
    </>
  );
};

export default AppWrapper;
