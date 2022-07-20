import * as React from "react";
import { Routes, Route, Link, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import {
  HomePage,
  BookmarksPage,
  ExplorePage,
  ListPage,
  MessagePage,
  NotificationsPage,
  ProfilePage,
  TestPickerPage,
  LoginPage,
} from "./pages";
import { AuthProviderWrapper, useAuth } from "./authprovider";

import { TestPickerLayout, TwitterWebLayout } from "./layouts";
import CONFIG from "./config";
import PageLoaderConfigs from "./pageloaders";

const DEFAULT_STATE = {
  lottieOption: CONFIG.LOTTIE_OPTIONS.Ease,
  pageLoaderOption: CONFIG.PAGE_LOADER_OPTIONS.Position,
};

export default function App() {
  const location = useLocation();

  const [activeLottieOption, setLottieOption] = React.useState(
    DEFAULT_STATE.lottieOption
  );
  const [activePageLoaderOption, setPageLoaderOption] = React.useState(
    DEFAULT_STATE.pageLoaderOption
  );

  const onLottieSelectCallback = (option) => {
    setLottieOption(option);
  };

  const onPageLoaderSelectCallback = (option) => {
    sessionStorage.setItem("show_ghosts", (option === CONFIG.PAGE_LOADER_OPTIONS.Ghost) ? 1 : 0);

    setPageLoaderOption(option);
  };

  const currentPageLoaderConfig = PageLoaderConfigs[activePageLoaderOption];

  const showLarryEntrance = parseInt(sessionStorage.getItem("show_larry"));
  if (showLarryEntrance) {
    window.showLarryEntrance = true;
    sessionStorage.setItem("show_larry", 0);
  } else {
    window.showLarryEntrance = false;
  }

  const nextPath = location.pathname;


  return (
    <AuthProviderWrapper>
      <AnimatePresence>
        <Routes location={location} key={nextPath}>
          <Route path="/test" element={<TestPickerLayout />}>
            <Route path="login" element={<LoginPage />} />
            <Route
              path="picker"
              element={
                <TestPickerPage
                  activeLottieOption={activeLottieOption}
                  activePageLoaderOption={activePageLoaderOption}
                  onLottieSelectCallback={onLottieSelectCallback}
                  onPageLoaderSelectCallback={onPageLoaderSelectCallback}
                />
              }
            />
          </Route>

          <Route
            path="/"
            element={
              <RequireAuth>
                <TwitterWebLayout
                  showLarryEntrance={showLarryEntrance}
                  pageLoaderConfig={currentPageLoaderConfig}
                  activeLottieOption={activeLottieOption}
                  currentPath={nextPath}
                />
              </RequireAuth>
            }
          >
            <Route
              index
              element={
                <HomePage
                  pageLoaderConfig={currentPageLoaderConfig}
                  slug={"/"}
                />
              }
            />

            <Route
              path="explore"
              element={
                <ExplorePage
                  pageLoaderConfig={currentPageLoaderConfig}
                  slug={"/explore"}
                />
              }
            />
            <Route
              path="bookmarks"
              element={
                <BookmarksPage
                  pageLoaderConfig={currentPageLoaderConfig}
                  slug={"/bookmarks"}
                />
              }
            />
            <Route
              path="lists"
              element={
                <ListPage
                  pageLoaderConfig={currentPageLoaderConfig}
                  slug={"/lists"}
                />
              }
            />
            <Route
              path="messages"
              element={
                <MessagePage
                  pageLoaderConfig={currentPageLoaderConfig}
                  slug={"/messages"}
                />
              }
            />
            <Route
              path="notifications"
              element={
                <NotificationsPage
                  pageLoaderConfig={currentPageLoaderConfig}
                  slug={"/notifications"}
                />
              }
            />
            <Route
              path="profile"
              element={
                <ProfilePage
                  pageLoaderConfig={currentPageLoaderConfig}
                  slug={"/profile"}
                />
              }
            />

            {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </AnimatePresence>
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
