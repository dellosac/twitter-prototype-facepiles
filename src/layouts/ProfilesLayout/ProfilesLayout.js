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
