import Page from "./Page";
import styles from "./Bookmarks.module.scss";
import { StaticItem, Transition } from "../components";

const BookmarkPage = ({ pageLoaderConfig, slug }) => {
  return (
    <Page slug={slug} pageLoaderConfig={pageLoaderConfig}>
      <article className={styles.bookmarkPage}>
        <Transition 
          isActive={true}
          animationConfiguration={pageLoaderConfig}
          entranceDelay={0}
        >
          <div className={styles.pageHeader}>
            <div className={styles.pageHeaderCopy}>
              <h1 className={`headline2 ${styles.pageLabel}`}>Bookmarks</h1>
              <h2 className={`subtext2 ${styles.pageSublabel}`}>@handle</h2>
            </div>
            <StaticItem src={'./images/pages/bookmarks/bookmark-add-cta'} /> 
          </div>
        </Transition>
        <Transition 
          isActive={true}
          animationConfiguration={pageLoaderConfig}
          entranceDelay={1 * pageLoaderConfig.delayFactor}
        >
          <ul className={styles.bookmarksWrapper}>
            {[...Array(6)].map((e, i) => {
              return (
                <Transition 
                  key={`lil-${i}`}
                  isActive={true}
                  animationConfiguration={pageLoaderConfig}
                  entranceDelay={(1 + i) * pageLoaderConfig.delayFactor}
                  hasSkeletalLoading={true}
                >
                  <li className={styles.bookmarkMenuItem}>
                    <StaticItem src={'./images/pages/bookmarks/bookmark-' + (i + 1)} />
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

export default BookmarkPage;