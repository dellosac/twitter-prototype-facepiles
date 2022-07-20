import Page from "./Page";
import styles from "./HomePage.module.scss";
import OrderCTA from "../images/order-cta.png";
import TweetOptions from '../images/tweet-options.png';
import { StaticItem, Transition } from "../components";

const HomePage = ({ pageLoaderConfig, slug }) => {
  
  return (
    <Page slug={slug} pageLoaderConfig={pageLoaderConfig}>
      <article className={styles.homePage}>
        <Transition 
          isActive={true}
          animationConfiguration={pageLoaderConfig}
          entranceDelay={0 * pageLoaderConfig.delayFactor}
          component={"latestTweets"}
        >
          <div className={styles.pageHeader}>
            <h1 className={`headline2 ${styles.pageLabel}`}>Latest Tweets</h1>
            <img className={styles.orderCTA} src={OrderCTA} />
          </div>
        </Transition>
        <Transition 
          isActive={true}
          animationConfiguration={pageLoaderConfig}
          entranceDelay={0 * pageLoaderConfig.delayFactor}
          component={"tweetComposer"}
        >
          <div className={styles.tweetComposer}>
            <img className={styles.pfp} />
            <div className={styles.wrapper}>
              <span className={`headline1 ${styles.prompt}`}>What's happening?</span>
              <div className={styles.ctas}>
                <img className={styles.tweetOptions} src={TweetOptions} />
                <div className={`body ${styles.tweetCTA}`}>Tweet</div>
              </div>
            </div>
          </div>
        </Transition>
        <Transition 
          isActive={true}
          animationConfiguration={pageLoaderConfig}
          entranceDelay={2 * pageLoaderConfig.delayFactor}
        >
          <ul className={styles.tweetsWrapper}>
            {[...Array(4)].map((e, i) => {
              return (
                <Transition 
                  key={`lil-${i}`}
                  isActive={true}
                  animationConfiguration={pageLoaderConfig}
                  entranceDelay={(2 + i) * pageLoaderConfig.delayFactor}
                  hasSkeletalLoading={true}
                >
                  <li>
                    <StaticItem src={'./images/pages/home/tweet-' + (i + 1)} />
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

export default HomePage;