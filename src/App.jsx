import { lazy, Suspense } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import AppWrapper from "@/components/app-components/AppWrapper.jsx";
import ErrorBoundary from "@/components/app-components/ErrorBoundary.jsx";
import Loading from "@/components/app-components/Loading.jsx";

const Home = lazy(() => import("@/pages/Home.jsx"));
const NotFound = lazy(() => import("@/pages/NotFound.jsx"));

const App = () => {
  return (
    <Router>
      <ErrorBoundary>
        <AppWrapper>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </AppWrapper>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
