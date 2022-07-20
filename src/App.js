import * as React from "react";
import { Routes, Route, Link, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { TestPickerPage, LoginPage } from "./pages";
import { AuthProviderWrapper, useAuth } from "./authprovider";

import { TestPickerLayout, HomeTimelineLayout } from "./layouts";
import mockDataProvider from "./dataprovider";

import CONFIG from "./config";

export default function App() {
  const [activeTestOptions, setActiveTestOptions] =
    React.useState(CONFIG.TEST_PARAMETERS);

  // events
  const onTestOptionsChanged = (updatedOption) => {
    const clonedActiveTestOptions = Object.assign({}, activeTestOptions);
    const updatedOptionKey = updatedOption.testKey;
    clonedActiveTestOptions[updatedOptionKey] = updatedOption;
    mockDataProvider.reset();

    setActiveTestOptions(clonedActiveTestOptions);
  };

  const location = useLocation();
  const nextPath = location.pathname;

  console.log("nextPath", nextPath);

  if (nextPath === "/test/picker") {
    mockDataProvider.reset();
  }

  return (
    <AuthProviderWrapper>
        <Routes location={location} key={nextPath}>
          <Route path="/test" element={<TestPickerLayout />}>
            <Route path="login" element={<LoginPage />} />
            <Route
              path="picker"
              element={
                <TestPickerPage
                  activeTestOptions={activeTestOptions}
                  onTestOptionsChanged={onTestOptionsChanged}
                />
              }
            />
          </Route>

          <Route
            path="/"
            element={
              <RequireAuth>
                <HomeTimelineLayout testOptions={activeTestOptions} />
              </RequireAuth>
            }
          >
            <Route path="*" element={<NoMatch />} />
          </Route>
          <Route
            path="/mock/profile"
            element={
              <RequireAuth>
                <p>Profile Page</p>
              </RequireAuth>
            }
          >
            <Route path="*" element={<NoMatch />} />
          </Route>
          <Route
            path="/mock/tweet/detail"
            element={
              <RequireAuth>
                <p>Tweet Detail</p>
              </RequireAuth>
            }
          >
            <Route path="*" element={<NoMatch />} />
          </Route>
          <Route
            path="/mock/tweet/composer"
            element={
              <RequireAuth>
                <p>Tweet Composer</p>
              </RequireAuth>
            }
          >
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
    </AuthProviderWrapper>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}

function RequireAuth({ children }) {
  let auth = useAuth();
  let location = useLocation();

  if (
    !auth.isAuthenticated ||
    auth.isAuthenticated === undefined ||
    auth.isAuthenticated === null
  ) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/test/login" state={{ from: location }} replace />;
  }

  return children;
}
