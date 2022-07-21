import styles from "./Facepile.module.scss";
import { StaticItem } from "../../../components";
import { motion, Reorder } from "framer-motion";

const Facepile = ({ facepile, avatarImage, index, total, direction, showUnreadNotification }) => {
  return (
    <Reorder.Item
      value={facepile.id}
      id={avatarImage}
      initial={{ opacity: 0, x: 3, y: 0 }}
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
      <motion.div className={styles.avatarIconWrapper}>
        <StaticItem
          className={styles.avatarIcon}
          src={`/images/accounts/${avatarImage}`}
        />
      </motion.div>
      {facepile.unread && index === total && showUnreadNotification && (
        <span
          className={`${styles.unreadNotification} ${
            direction === "lefttoright"
              ? styles.directionlefttoright
              : styles.directionrighttoleft
          }`}
        />
      )}
    </Reorder.Item>
  );
};

export default Facepile;
