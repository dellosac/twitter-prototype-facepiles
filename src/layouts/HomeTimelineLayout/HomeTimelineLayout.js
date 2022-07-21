import React, { useState, useEffect } from "react";

import { MockTweet, StaticItem } from "../../components";
import styles from "./HomeTimelineLayout.module.scss";
import mockDataProvider from "../../dataprovider";

const HomeTimelineLayout = ({ testOptions }) => {
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
  }, [timeline, mockDataProvider]);

  return (
    <main className={styles.main}>
      <header className={styles.timelineHeader}>
        <StaticItem
          className={styles.avatarHeader}
          src="/images/accounts/UserAvatar"
        />
        <img
          className={styles.logo}
          src="/images/cons/IconTwitter.svg"
          alt="Twitter logo"
        />
        <img
          className={styles.timelineSwitcher}
          src="/images/icons/IconTimeline.svg"
          alt="change timeline"
        />
      </header>
      <ul className={styles.timelineList}>
        {timeline.map((tweet, index) => {
          const tweetAccount = mockDataProvider.getAccountByHandle(
            tweet.handle
          );

          return (
            <li
              key={`timeline-tweet-${index}`}
              className={styles.timelineListItem}
            >
              <MockTweet
                {...tweet}
                tweetAccount={tweetAccount}
                showFacePiles={testOptions.FACEPILES.options[testOptions.FACEPILES.activeOptionIndex].value === "facepiles"}
                facePileDirection={testOptions.FACEPILE_DIRECTION.options[testOptions.FACEPILE_DIRECTION.activeOptionIndex].value}
              />
            </li>
          );
        })}
        {
          // JSON.stringify(timeline)
        }
      </ul>
      <button className={styles.composeButton}>
        <img src="/images/icons/IconCompose.svg" alt="compose a tweet" />
      </button>
      <footer className={styles.timelineFooter}>
        <ul className={styles.timelineFooterList}>
          <li>
            <img src="/images/icons/IconHome.svg" alt="Home" />
          </li>
          <li>
            <img src="/images/icons/IconSearch.svg" alt="Search" />
          </li>
          <li>
            <img src="/images/icons/IconNotificationsStroke.svg" alt="Notifications" />
          </li>
          <li>
            <img src="/images/icons/IconMessagesStroke.svg" alt="Messages" />
          </li>
        </ul>
      </footer>
    </main>
  );
};

export default HomeTimelineLayout;
