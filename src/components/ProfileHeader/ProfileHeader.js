import styles from "./ProfileHeader.module.scss";
import IMAGE_PRELOADER from "../../utils/";
import StaticItem from "../StaticItem";
import { Link } from "react-router-dom";

const ProfileHeader = (props) => {
  return (
    <div>
      <a href="/">
        <StaticItem src={"/images/profile/profile_" + props.profileId.replace("@","")} className={styles.profile} />
      </a>
    </div>
  );
};

export default ProfileHeader;
