import { useState, useEffect } from "react";
import { MockiOSHeader, ThreadComposer, MockiOSFooter } from "../../components";
import styles from "./TweetComposerLayout.module.scss";
import CONFIG from "../../config";

const DEFAULT_CHARACTER_TRIGGER = 140;

function debounce(func, timeout = 100) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

const UPDATE_VISUAL_VIEWPORT = () => {
  let root = document.documentElement;
  root.style.setProperty(
    "--window-inner-height",
    `${window.visualViewport.height}px`
  );
};

const TweetComposerLayout = ({
  activeCharacterTriggerCount,
  activeTriggerUX,
}) => {
  const [tweetThread, setTweetThread] = useState([""]);
  const [activeTweetIndex, setActiveTweetIndex] = useState(0);
  const [tooltipWasDismissed, setTooltipWasDismissed] = useState(false);

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", (e) => {
      UPDATE_VISUAL_VIEWPORT();

      setKeyboardVisible(!isKeyboardVisible);
    });

    // toggle isKeyboardVisible on event listener triggered
    window.visualViewport.addEventListener("resize", () => {
      UPDATE_VISUAL_VIEWPORT();
      setKeyboardVisible(!isKeyboardVisible);
    });
  }, [isKeyboardVisible]);

  const useAcceleratePrompts =
    activeTriggerUX === CONFIG.TRIGGER_UX.Accelerator;
  const characterTrigger =
    CONFIG.CHARACTER_COUNT_TRIGGERS_MAP[activeCharacterTriggerCount];

  // Events
  const onTweetThreadEdit = (tweetIndex, tweetNewValue) => {
    UPDATE_VISUAL_VIEWPORT();
    setKeyboardVisible(!isKeyboardVisible);

    let clonedTweetThread = [...tweetThread];
    clonedTweetThread[tweetIndex] = tweetNewValue;

    if (useAcceleratePrompts) {
      if (tweetNewValue.length >= characterTrigger && tweetThread.length <= 1) {
        clonedTweetThread.push("");
      } else if (
        tweetNewValue.length >= DEFAULT_CHARACTER_TRIGGER &&
        tweetThread.length > 1 &&
        tweetIndex === tweetThread.length - 1
      ) {
        clonedTweetThread.push("");
      }
    }

    setTweetThread(clonedTweetThread);
  };

  const dismissToolTipCallback = () => {
    setTooltipWasDismissed(true);
  };

  const onTweetFocus = (index) => {
    UPDATE_VISUAL_VIEWPORT();
    setKeyboardVisible(!isKeyboardVisible);
    setActiveTweetIndex(index);
  };

  const onClickAddToThread = () => {
    let clonedTweetThread = [...tweetThread];
    clonedTweetThread.splice(activeTweetIndex + 1, 0, "");

    console.log("clonedTweetThread", clonedTweetThread);
    setTweetThread(clonedTweetThread);
  };

  const onClickRemoveTweet = () => {
    let clonedTweetThread = [...tweetThread];
    clonedTweetThread.splice(activeTweetIndex, 1);

    console.log("clonedTweetThread", clonedTweetThread);
    setTweetThread(clonedTweetThread);
    setActiveTweetIndex(0);
  };

  console.log("active index", activeTweetIndex);
  console.log("isKeyboardVisible", isKeyboardVisible);

  return (
    <main className={styles.main}>
      <MockiOSHeader
        props={
          tweetThread.length > 1 && tweetThread[1].length > 0 ? true : false
        }
      />
      <ThreadComposer
        tweetThread={tweetThread}
        onTweetThreadEdit={onTweetThreadEdit}
        onTweetFocus={onTweetFocus}
        activeTweetIndex={activeTweetIndex}
        onClickRemoveTweet={onClickRemoveTweet}
      />
      <MockiOSFooter
        activeCharacterTriggerCount={activeCharacterTriggerCount}
        activeTriggerUX={activeTriggerUX}
        tweetThread={tweetThread}
        activeTweetIndex={activeTweetIndex}
        onClickAddToThread={onClickAddToThread}
        isKeyboardVisible={isKeyboardVisible}
        dismissToolTipCallback={dismissToolTipCallback}
        tooltipWasDismissed={tooltipWasDismissed}
      />
    </main>
  );
};

export default TweetComposerLayout;
