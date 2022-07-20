import Page from "./Page";
import styles from "./Notifications.module.scss";
import { StaticItem, Transition } from "../components";

const NotificationsPage = ({ pageLoaderConfig, slug }) => {
  return (
    <Page slug={slug} pageLoaderConfig={pageLoaderConfig}>
      <article className={styles.notificationsPage}>
        <Transition 
          isActive={true}
          animationConfiguration={pageLoaderConfig}
          entranceDelay={0}
        >
          <div className={styles.pageHeader}>
            <h1 className={`headline2 ${styles.pageLabel}`}>Notifications</h1>
            <StaticItem src={'./images/pages/notifications/config-cta'} /> 
          </div>
        </Transition>
        <Transition 
          isActive={true}
          animationConfiguration={pageLoaderConfig}
          entranceDelay={1 * pageLoaderConfig.delayFactor}
        >
          <ul className={styles.notificationsWrapper}>
            {[...Array(7)].map((e, i) => {
              return (
                <Transition 
                  key={`lil-${i}`}
                  isActive={true}
                  animationConfiguration={pageLoaderConfig}
                  entranceDelay={(1 + i) * pageLoaderConfig.delayFactor}
                  hasSkeletalLoading={i > 0}
                >
                  <li>
                    <StaticItem src={'./images/pages/notifications/notification-' + (i + 1)} />
                  </li>
                </Transition>
              );
            })}
          </ul>
        </Transition>
      </article>    
    </Page>
  );
};

export default NotificationsPage;