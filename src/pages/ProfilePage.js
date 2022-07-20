import Page from "./Page";
import styles from "./Profile.module.scss";
import { StaticItem, Transition } from "../components";

const ProfilePage = ({ pageLoaderConfig, slug }) => {
  return (
    <Page slug={slug} pageLoaderConfig={pageLoaderConfig}>
      <article className={styles.profilePage}>
        <Transition 
          isActive={true}
          animationConfiguration={pageLoaderConfig}
          entranceDelay={0}
        >
          <div className={styles.pageHeader}>
            <StaticItem className={styles.backCta} src={'./images/pages/profile/back-cta'} />
            <div className={styles.pageLabel}>
              <h1 className={`headline2 ${styles.pageHeadline}`}>First Last</h1>
              <h2 className={`subtext2 ${styles.pageSubline}`}>7,226 Tweets</h2>
            </div>
          </div>
        </Transition>
        <Transition 
          isActive={true}
          animationConfiguration={pageLoaderConfig}
          entranceDelay={1 * pageLoaderConfig.delayFactor}
        >
          <StaticItem className={styles.banner} src={'./images/pages/profile/banner'} />
        </Transition>
        <Transition 
          isActive={true}
          animationConfiguration={pageLoaderConfig}
          entranceDelay={4 * pageLoaderConfig.delayFactor}
        >
          <div className={styles.pfp}>
            <StaticItem src={'./images/pages/profile/pfp'} />
          </div>
        </Transition>
        <Transition 
          isActive={true}
          animationConfiguration={pageLoaderConfig}
          entranceDelay={5 * pageLoaderConfig.delayFactor}
        >
          <div className={`subtext1 ${styles.editProfileBtn}`}>Edit profile</div>
        </Transition>
        <div className={styles.copyLockup}>
          <Transition 
            isActive={true}
            animationConfiguration={pageLoaderConfig}
            entranceDelay={6 * pageLoaderConfig.delayFactor}
            >
            <div className={`headline1 ${styles.displayNameLabel}`}>
              <h1 >First Last</h1>
            </div>
          </Transition>
          <Transition 
            isActive={true}
            animationConfiguration={pageLoaderConfig}
            entranceDelay={7 * pageLoaderConfig.delayFactor}
            >
            <h2 className={`body ${styles.usernameLabel}`}>@username</h2>
          </Transition>
          <Transition 
            isActive={true}
            animationConfiguration={pageLoaderConfig}
            entranceDelay={8 * pageLoaderConfig.delayFactor}
            >
            <p className={`body ${styles.bio}`}>What's happening?!</p>
          </Transition>
          <Transition 
            isActive={true}
            animationConfiguration={pageLoaderConfig}
            entranceDelay={9 * pageLoaderConfig.delayFactor}
            >
            <div className={`subtext2 ${styles.metaData}`}>
              <StaticItem className={styles.locationIcon} src={'./images/pages/profile/location-icon'} />
              <span className={styles.locationLabel}>Everywhere</span>
              <span className={styles.linkIcon}>
                <StaticItem src={'./images/pages/profile/link-icon'} />
              </span>
              <span className={styles.linkLabel}>twitter.com</span>
              <span className={styles.dateIcon}>            
                <StaticItem src={'./images/pages/profile/date-icon'} />
              </span>
              <span className={styles.dateLabel}>Joined November 2009</span>
            </div>
          </Transition>
          <Transition 
            isActive={true}
            animationConfiguration={pageLoaderConfig}
            entranceDelay={10 * pageLoaderConfig.delayFactor}
            >
            <div className={styles.followerInfo}>
              <span className={`subtext2 ${styles.followingCount}`}>1.6K </span>
              <span className={`subtext1 ${styles.followingLabel}`}>Following</span>
              <span className={`subtext2 ${styles.followerCount}`}>1.2M </span>
              <span className={`subtext1 ${styles.followerLabel}`}>Followers</span>
            </div>
          </Transition>
        </div>
        <ul className={styles.tweetsWrapper}>
          {[...Array(5)].map((e, i) => {
            return (
              <Transition 
                key={`lil-${i}`}
                isActive={true}
                animationConfiguration={pageLoaderConfig}
                entranceDelay={(10 + i) * pageLoaderConfig.delayFactor}
                hasSkeletalLoading={i > 0}
              >
                <li>
                  <StaticItem src={'./images/pages/profile/profile-' + (i + 1)} />
                </li>
              </Transition>
            );
          })}
        </ul>
      </article>    
    </Page>
  );
};

export default ProfilePage;