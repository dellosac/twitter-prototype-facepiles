import Page from "./Page";
import styles from "./Explore.module.scss";
import { StaticItem, Transition } from "../components";

const ExplorePage = ({ pageLoaderConfig, slug }) => {
  return (
    <Page slug={slug} pageLoaderConfig={pageLoaderConfig}>
      <article className={styles.explorePage}>
        <Transition 
          isActive={true}
          animationConfiguration={pageLoaderConfig}
          entranceDelay={0 * pageLoaderConfig.delayFactor}
        >
          <ul className={styles.exploreWrapper}>
            {[...Array(10)].map((e, i) => {
              return (
                <Transition 
                  key={`lil-${i}`}
                  isActive={true}
                  animationConfiguration={pageLoaderConfig}
                  entranceDelay={i * pageLoaderConfig.delayFactor}
                  hasSkeletalLoading={i > 1}
                >
                  <li>
                    <StaticItem src={'./images/pages/explore/explore-' + (i + 1)} />
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

export default ExplorePage;