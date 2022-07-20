import React, { useState, useEffect } from "react";

import { MockTweet, ProfileHeader, StaticItem } from "../../components";
import styles from "./ProfilesLayout.module.scss";
import mockDataProvider from "../../dataprovider";

const ProfilesLayout = ({ testOptions }) => {
  const [timeline, setTimeline] = useState(
    JSON.parse(JSON.stringify(mockDataProvider.get()))
  );

  useEffect(() => {
    let interval = setInterval(() => {
      const clonedTimeline = JSON.parse(JSON.stringify(mockDataProvider.get()));

      setTimeline(clonedTimeline);
    }, 100);

    // } else if (!isActive && seconds !== 0) {
    //   clearInterval(interval);
    // }
    return () => {
      clearInterval(interval);
    };
  }, [timeline]);

  return (
    <main className={styles.main}>
      <ProfileHeader />
      <button className={styles.composeButton}>
        <img src="/images/icons/iconCompose.svg" alt="compose a tweet" />
      </button>
      <footer className={styles.timelineFooter}>
        <ul className={styles.timelineFooterList}>
          <li>
            <img src="/images/icons/iconHome.svg" alt="Home" />
          </li>
          <li>
            <img src="/images/icons/iconSearch.svg" alt="Search" />
          </li>
          <li>
            <img src="/images/icons/iconNotificationsStroke.svg" alt="Notifications" />
          </li>
          <li>
            <img src="/images/icons/iconMessagesStroke.svg" alt="Messages" />
          </li>
        </ul>
      </footer>
    </main>
  );
};

export default ProfilesLayout;
