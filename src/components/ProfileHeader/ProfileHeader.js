import styles from "./ProfileHeader.module.scss";
import IMAGE_PRELOADER from "../../utils/";
import StaticItem from "../StaticItem";
import { Link, useNavigate } from "react-router-dom";

const ProfileHeader = (props) => {
  const navigate = useNavigate();

  return (
    <div>
      <StaticItem src={"/images/profile/profile_" + props.profileId.replace("@","")} className={styles.profile} onClick={() => navigate(-1)}/>
    </div>
  );
};

export default ProfileHeader;