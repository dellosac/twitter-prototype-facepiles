import { useEffect } from "react";
import { motion } from "framer-motion";

import styles from "./MockiOSFooter.module.scss";
import stylesProgressCircle from "./MockiOSFooter.progressCircle.scss";
import StaticItem from "../StaticItem";

import CONFIG from "../../config";

const COUNTDOWN_START = 20;
const TOOLTIP_ANIMATION_CONFIG = {
  initial: { opacity: 0, translateY: 10 },
  animate: { opacity: 1, translateY: 0 },
  exit: { opacity: 0, translateY: 10 },
};

const MockiOSFooter = ({
  activeCharacterTriggerCount,
  activeTriggerUX,
  tweetThread,
  activeTweetIndex,
  onClickAddToThread,
  isKeyboardVisible,
  dismissToolTipCallback,
  tooltipWasDismissed,
}) => {
  useEffect(() => {
    let root = document.documentElement;

    const tweetProgress = activeTweetInThread.length / 280;
    const circleValue =
      Math.round(180 * tweetProgress) <= 180
        ? Math.round(180 * tweetProgress)
        : 180;
    root.style.setProperty(
      "--radial-circle-value",
      `rotate(${circleValue}deg)`
    );

    if (activeTweetInThread.length <= 280 && activeTweetInThread.length > 259) {
      root.style.setProperty(
        "--radial-circle-color",
        "var(--radial-circle-warning-value)"
      );
      root.style.setProperty(
        "--radial-circle-font-color",
        "var(--radial-circle-font-default-value)"
      );
      root.style.setProperty(
        "--radial-circle-default-scale",
        "var(--radial-circle-warning-scale-value)"
      );
    } else if (activeTweetInThread.length > 280) {
      root.style.setProperty(
        "--radial-circle-color",
        "var(--radial-circle-error-value)"
      );
      root.style.setProperty(
        "--radial-circle-font-color",
        "var(--radial-circle-error-value)"
      );
      root.style.setProperty(
        "--radial-circle-default-scale",
        "var(--radial-circle-error-scale-value)"
      );
    } else {
      root.style.setProperty(
        "--radial-circle-color",
        "var(--radial-circle-default-value)"
      );
      root.style.setProperty(
        "--radial-circle-font-color",
        "var(--radial-circle-font-default-value)"
      );
      root.style.setProperty(
        "--radial-circle-default-scale",
        "var(--radial-circle-font-default-value)"
      );
    }
  });

  const activeTweetInThread = tweetThread[activeTweetIndex];
  const remainingCharacters = (activeTweetInThread.length - 280) * -1;
  const isAddToThreadActive =
    activeTweetInThread.length > 0 &&
    (tweetThread.length - 1 === activeTweetIndex ||
      tweetThread[activeTweetIndex + 1].length > 0);

  // events
  const onPlusClick = (e) => {
    e.preventDefault();
    console.log("isAddToThreadActive", isAddToThreadActive);

    if (typeof dismissToolTipCallback === "function") {
      dismissToolTipCallback();
    }

    if (isAddToThreadActive) {
      onClickAddToThread();
    }
  };

  const onTooltipClick = (e) => {
    e.preventDefault();

    if (typeof dismissToolTipCallback === "function") {
      dismissToolTipCallback();
    }
  };

  const characterTrigger =
    CONFIG.CHARACTER_COUNT_TRIGGERS_MAP[activeCharacterTriggerCount];

  const showToolTip =
    activeTriggerUX === CONFIG.TRIGGER_UX.Tooltip &&
    activeTweetInThread.length >= characterTrigger &&
    !tooltipWasDismissed;

  return (
    <footer
      className={styles.footer}
      style={{
        bottom: isKeyboardVisible
          ? window.innerHeight - window.visualViewport.height
          : window.innerHeight - window.visualViewport.height,
      }}
    >
      {showToolTip && (
        <motion.div
          className={styles.tooltip}
          onClick={onTooltipClick}
          variants={TOOLTIP_ANIMATION_CONFIG}
          initial="initial"
          animate="animate"
          exit={null}
          transition={{
            duration: 0.3,
            delay: 0,
          }}
        >
          Want to tell a longer story? Add another Tweet by hitting the plus.
        </motion.div>
      )}

      <div className={styles.wrapper_reply}>
        <StaticItem src="./images/footer/globe" className={styles.globe} />
        <div className={styles.reply_copy}>Everyone can reply</div>
      </div>
      <div className={styles.wrapper_actions}>
        <StaticItem src="./images/footer/Icons" className={styles.icons} />
        <div className={styles.wrapper_circle_plus}>
          <div className={styles.wrapper_circle}>
            <div className="circle_wrap">
              <div className="circle">
                <div className="mask full">
                  <div className="fill"></div>
                </div>
                <div className="mask half">
                  <div className="fill"></div>
                </div>
                <div className="inside_circle">
                  {remainingCharacters <= COUNTDOWN_START && (
                    <span>{remainingCharacters}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.horizontal_line}></div>
          <div className={styles.wrapper_plus} onClick={onPlusClick}>
            <StaticItem
              src="./images/footer/plus"
              className={`${isAddToThreadActive ? styles.isActive : null} ${
                styles.plus
              }`}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MockiOSFooter;
