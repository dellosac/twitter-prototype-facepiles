import { SidebarLeft, SidebarRight } from "../../components";
import { Outlet } from "react-router-dom";
import Lotties from "../../lotties";

import TwitterWebLayoutTransition from "./TwitterWebLayoutTransition";
import styles from "./TwitterWebLayout.module.scss";

const _renderSideBar = (currentPath, pageLoaderConfig) => {
  let shouldAnimateRightBar = parseInt(
    sessionStorage.getItem("animate_right_bar")
  );
  sessionStorage.setItem("animate_right_bar", 0);

  if (currentPath === "/Messages") {
    sessionStorage.setItem("animate_right_bar", 1);
    return null;
  }

  if (currentPath === "/Explore") {
    sessionStorage.setItem("animate_right_bar", 1);
    shouldAnimateRightBar = true;
  }

  return (
    <SidebarRight
      showLarryEntrance={shouldAnimateRightBar}
      loaderStyle={pageLoaderConfig}
      hideWhatsHappening={(currentPath === "/Explore")}
    />
  );
};

const TwitterWebLayout = ({
  pageLoaderConfig,
  activeLottieOption,
  showLarryEntrance = false,
  currentPath,
}) => {
  const onNavigationChange = (newNavSlug) => {
    console.log("navigation changed", newNavSlug);
  };

  console.log("currentPath", currentPath);

  const ANIMATION_CONFIG = {
    initial: { opacity: 1 },
    animate: { opacity: 0 },
    exit: { opacity: 0 },
  };

  return (
    <main className={`${styles.layout}`}>
      <nav className={styles.navigation}>
        <SidebarLeft
          showLarryEntrance={showLarryEntrance}
          loaderStyle={pageLoaderConfig}
          activeItem={activeLottieOption}
          onNavigationChange={onNavigationChange}
          lotties={Lotties[activeLottieOption]}
          animateIcons={activeLottieOption !== "None"}
          pageLoaderConfig={pageLoaderConfig}
        />
      </nav>
      <div className={styles.contentWrapper}>
        <article className={styles.pages}>
          <Outlet />
        </article>
        {_renderSideBar(currentPath, pageLoaderConfig)}
      </div>
      {showLarryEntrance == true && (
        <TwitterWebLayoutTransition
          isActive={showLarryEntrance}
          entranceDelay={pageLoaderConfig.name === "None" ? 0 : 1}
          entranceDuration={pageLoaderConfig.name === "None" ? 0 : 0.3}
          exitDelay={0}
          exitDuration={0}
          animationConfiguration={ANIMATION_CONFIG}
          entranceOnly={true}
        >
          <div className={styles.animateLarry}></div>
        </TwitterWebLayoutTransition>
      )}
    </main>
  );
};

export default TwitterWebLayout;
