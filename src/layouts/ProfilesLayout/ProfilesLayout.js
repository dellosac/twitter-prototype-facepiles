import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { MockTweet, ProfileHeader, StaticItem } from "../../components";
import styles from "./ProfilesLayout.module.scss";
import mockDataProvider from "../../dataprovider";

const ProfilesLayout = ({ testOptions }) => {
  let { profileId } = useParams();
  mockDataProvider.reset();

  return (
    <main className={styles.main}>
      <ProfileHeader profileId={ profileId } />
      <button className={styles.composeButton}>
        <img src="/images/icons/Compose.svg" alt="compose a tweet" />
      </button>
      <footer className={styles.timelineFooter}>
        <ul className={styles.timelineFooterList}>
          <li>
            <img src="/images/icons/Home.svg" alt="Home" />
          </li>
          <li>
            <img src="/images/icons/Search.svg" alt="Search" />
          </li>
          <li>
            <img src="/images/icons/NotificationsStroke.svg" alt="Notifications" />
          </li>
          <li>
            <img src="/images/icons/MessagesStroke.svg" alt="Messages" />
          </li>
        </ul>
      </footer>

    </main>
  );
};

export default ProfilesLayout;
