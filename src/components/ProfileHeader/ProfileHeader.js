import styles from "./ProfileHeader.module.scss";
import { Link } from "react-router-dom";

const ProfileHeader = (props) => {
  return (
    <header className={styles.header}>
      <div className={styles.headerSections}>
        <Link className={styles.submitLink} to="/test/picker">
          <button className={styles.cancelBtn}>Cancel</button>
        </Link>
      </div>
      <div className={styles.headerSections}>
        <a className={styles.draftsBtn}>Drafts</a>
        <button className={styles.tweetBtn}>
          { props.props === true ? "Tweet all" : "Tweet" }
        </button>
      </div>
    </header>
  );
};

export default ProfileHeader;
