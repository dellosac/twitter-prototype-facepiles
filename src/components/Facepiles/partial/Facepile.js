import styles from "./Facepile.module.scss";
import { StaticItem } from "../../../components";
import { motion, Reorder } from "framer-motion";
import { Children } from "react";

const Facepile = ({
  shouldAnimate = false,
  facepile,
  avatarImage,
  index,
  total,
  direction,
  showUnreadNotification,
}) => {
  let readReplies = JSON.parse(localStorage.getItem("read-replies")) || [];
  const replyIsRead = readReplies.includes(facepile.id);

  return (
    <_RootWrapper
      shouldAnimate={shouldAnimate}
      facepile={facepile}
      avatarImage={avatarImage}
      direction={direction}
    >
      <motion.div className={styles.avatarIconWrapper}>
        <StaticItem
          className={styles.avatarIcon}
          src={`/images/accounts/${avatarImage}`}
        />
      </motion.div>
      {!replyIsRead && index === total && showUnreadNotification && (
        <span
          className={`${styles.unreadNotification} ${
            direction === "lefttoright"
              ? styles.directionlefttoright
              : styles.directionrighttoleft
          }`}
        />
      )}
    </_RootWrapper>
  );
};

const _RootWrapper = ({ shouldAnimate, direction, facepile, avatarImage, children }) => {
  if (!shouldAnimate) {
    return <li className={styles.root}>{children}</li>;
  }

  return (
    <Reorder.Item
      value={facepile.id}
      id={avatarImage}
      initial={{ opacity: 0, x: direction === "lefttoright" ? 3 : -3, y: 0 }}
      animate={{
        opacity: 1,
        x: 0,
        y: 0,
        // transition: { duration: 0.35 },
      }}
      exit={{
        x: -1,
        y: 0,
        opacity: 0,
        // transition: { duration: 0.2 }
      }}
      dragListener={false}
      className={styles.root}
    >
      {children}
    </Reorder.Item>
  );
};

export default Facepile;
