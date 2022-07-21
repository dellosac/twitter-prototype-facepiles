import { useState, useRef, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import { StaticItem } from "../../components";
import { useParams } from "react-router-dom";

import styles from "./ThreadComposer.module.scss";
import mockDataProvider from "../../dataprovider";
const MIN_TEXTAREA_HEIGHT = 52;
const ANIMATION_CONFIG = {
  initial: { opacity: 0, translateY: 10 },
  animate: { opacity: 1, translateY: 0 },
  exit: { opacity: 0, translateY: 10 },
};

const TweetComposer = ({
  tweetText,
  threadIndex,
  onTweetThreadEdit,
  onClickRemoveTweet,
  onTweetFocus,
  isActive = false,
  lastTweet = false,
  onlyTweet = false,
}) => {
  const tweetTextRef = useRef(null);
  const [tweetHeight, setTweetHeight] = useState(MIN_TEXTAREA_HEIGHT);
  let { profileId } = useParams();

  // events
  const onCancelTweetClick = (event) => {
    event.preventDefault();
    if (typeof onClickRemoveTweet === "function") {
      console.log("onClickRemoveTweet", onClickRemoveTweet);
      onClickRemoveTweet();
    }
  };

  const onTweetChange = (event) =>
    onTweetThreadEdit(threadIndex, event.target.value);

  const onTextAreaFocus = (e) => {
    onTweetFocus(threadIndex);
  };

  // effects
  useLayoutEffect(() => {
    // Reset height - important to shrink on delete
    tweetTextRef.current.style.height = "inherit";
    // Set height
    tweetTextRef.current.style.height = `${Math.max(
      tweetTextRef.current.scrollHeight,
      MIN_TEXTAREA_HEIGHT
    )}px`;
    setTweetHeight(tweetTextRef.current.scrollHeight);
  }, [tweetText]);

  // dynamic css classes
  let tweetWrapperClasses = [styles.tweetAvatarWrapper];

  if (lastTweet) {
    tweetWrapperClasses.push(styles.lastTweet);
  }

  if (tweetText.length) {
    tweetWrapperClasses.push(styles.hasCharacters);
  }

  if (threadIndex > 0) {
    [styles.avatar].push(styles.isThread);
  }

  let rootClasses = [styles.tweetComposer];

  if (isActive) {
    rootClasses.push(styles.isActive);
  }

  return (
    <motion.section
      className={rootClasses.join(" ")}
      variants={ANIMATION_CONFIG}
      initial="initial"
      animate="animate"
      exit={null}
      transition={{
        duration: 0.3,
        delay: 0,
      }}
    >
      <div className={tweetWrapperClasses.join(" ")}>
        <StaticItem
          className={`${styles.avatar} ${
            tweetText.length || threadIndex <= 0 ? styles.avatarThreaded : null
          }`}
          src={"/images/thread-composer/UserAvatar"}
        />
        <div
          className={styles.threadLine}
          style={{
            height: !lastTweet ? `${tweetHeight - 15}px` : "2px",
          }}
        ></div>
      </div>
      <section className={styles.tweetInputWrapper}>
        <p className={`subtext2 ${styles.replyingToCopy}`}>Replying to <span>{profileId}</span></p>
        <textarea
          className={styles.tweetInput}
          onChange={onTweetChange}
          ref={tweetTextRef}
          style={{
            minHeight: MIN_TEXTAREA_HEIGHT,
            resize: "none",
          }}
          onFocus={onTextAreaFocus}
          value={tweetText}
          placeholder={
            threadIndex < 1 ? "What's happening?" : "Add another Tweet"
          }
        />
      </section>
      <div onClick={onCancelTweetClick}>
        {!onlyTweet && (
          <StaticItem
            className={isActive ? styles.cancel : styles.hideCancel}
            src={"/images/thread-composer/x"}
          />
        )}
      </div>
    </motion.section>
  );
};

const ThreadComposer = ({
  tweetThread,
  onTweetThreadEdit,
  onTweetFocus,
  activeTweetIndex,
  onClickRemoveTweet,
}) => {
  const handleSubmit = (event) => {
    alert("tweet was submitted");
    event.preventDefault();
  };

  return (
    <form className={styles.threadComposer} onSubmit={handleSubmit}>
      <div className={styles.threadComposerWrapper}>
        {tweetThread.map((tweetText, index) => {
          return (
            <TweetComposer
              key={`tweet-composer-${index}`}
              tweetText={tweetText}
              threadIndex={index}
              onTweetThreadEdit={onTweetThreadEdit}
              onClickRemoveTweet={onClickRemoveTweet}
              onTweetFocus={onTweetFocus}
              isActive={activeTweetIndex === index}
              lastTweet={index === tweetThread.length - 1}
              onlyTweet={tweetThread.length === 1}
            />
          );
        })}
        {/* <h1>Hello</h1><h1>Hello</h1><h1>Hello</h1><h1>Hello</h1><h1>Hello</h1><h1>Hello</h1><h1>Hello</h1><h1>Hello</h1><h1>Hello</h1><h1>Hello</h1><h1>Hello</h1><h1>Hello</h1><h1>Hello</h1><h1>Hello</h1><h1>Hello</h1><h1>Hello</h1><h1>Hello</h1><h1>Hello</h1><h1>Hello</h1><h1>Hello</h1><h1>Hello</h1> */}
      </div>
    </form>
  );
};

export default ThreadComposer;
