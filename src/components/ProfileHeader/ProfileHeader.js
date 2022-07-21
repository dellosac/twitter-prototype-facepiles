import styles from "./ProfileHeader.module.scss";
import IMAGE_PRELOADER from "../../utils/";
import StaticItem from "../StaticItem";
import { Link } from "react-router-dom";

const ProfileHeader = (props) => {
  return (
    <div>
      <StaticItem src="./images/profile/profile_h_wang84" className={styles.globe} />
    </div>
  );
};

export default ProfileHeader;
