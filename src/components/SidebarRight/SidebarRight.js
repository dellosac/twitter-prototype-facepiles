import { Fragment } from "react";
import styles from "./SidebarRight.module.scss";
import StaticItem from "../StaticItem";
import SearchIcon from "../../images/search-icon.png";
import Transition from "../Transition";

const SidebarRight = ({
  loaderStyle,
  showLarryEntrance,
  hideWhatsHappening,
}) => {
  const whatsHappeningDelay = hideWhatsHappening ? 0 : 7;

  return (
    <div className={styles.SidebarRight}>
      <div className={styles.wrapper}>
        {!hideWhatsHappening && (
          <Fragment>
            <Transition
              isActive={showLarryEntrance}
              animationConfiguration={loaderStyle}
              entranceDelay={0 * loaderStyle.delayFactor}
              component={"searchBar"}
              entranceOnly={true}
            >
              <div className={styles.searchBar}>
                <div className={styles.searchBarPill}>
                  <div className={styles.searchWrapper}>
                    <img className={styles.searchIcon} src={SearchIcon} />
                    <span className={`body ${styles.searchLabel}`}>
                      Search Twitter
                    </span>
                  </div>
                </div>
              </div>
            </Transition>

            <Transition
              isActive={showLarryEntrance}
              animationConfiguration={loaderStyle}
              entranceDelay={1 * loaderStyle.delayFactor}
              component={"whatsHappeningModule"}
              entranceOnly={true}
            >
              <div className={styles.whatsHappeningModule}>
                <Transition
                  isActive={showLarryEntrance}
                  animationConfiguration={loaderStyle}
                  entranceDelay={1.5 * loaderStyle.delayFactor}
                  component={"whatsHappeningLabel"}
                  entranceOnly={true}
                >
                  <h1 className={`headline1 ${styles.whatsHappeningLabel}`}>
                    What's happening
                  </h1>
                </Transition>
                <ul className={styles.whatsHappeningWrapper}>
                  {[...Array(5)].map((e, i) => {
                    return (
                      <Transition
                        key={`lil-${i}`}
                        isActive={showLarryEntrance}
                        animationConfiguration={loaderStyle}
                        entranceDelay={(2 + i) * loaderStyle.delayFactor}
                        hasSkeletalLoading={showLarryEntrance}
                        entranceOnly={true}
                      >
                        <li className={styles.whatsHappeningItem}>
                          <StaticItem
                            src={
                              "./images/sidebar-right/whats-happening/item-" +
                              (i + 1)
                            }
                          />
                        </li>
                      </Transition>
                    );
                  })}
                </ul>
                <Transition
                  isActive={showLarryEntrance}
                  animationConfiguration={loaderStyle}
                  entranceDelay={7 * loaderStyle.delayFactor}
                  entranceOnly={true}
                >
                  <h4 className={`body ${styles.showMoreLabel}`}>Show more</h4>
                </Transition>
              </div>
            </Transition>
          </Fragment>
        )}

        <Transition
          isActive={showLarryEntrance}
          animationConfiguration={loaderStyle}
          entranceDelay={(1 + whatsHappeningDelay) * loaderStyle.delayFactor}
          component={"whoToFollowModule"}
          entranceOnly={true}
        >
          <div className={styles.whoToFollowModule}>
            <Transition
              isActive={showLarryEntrance}
              animationConfiguration={loaderStyle}
              entranceDelay={
                (1.5 + whatsHappeningDelay) * loaderStyle.delayFactor
              }
              component={"whoToFollowLabel"}
              entranceOnly={true}
            >
              <h1 className="headline1">Who to follow</h1>
            </Transition>
            <ul className={styles.whoToFollowWrapper}>
              {[...Array(3)].map((e, i) => {
                return (
                  <Transition
                    key={`lil-${i}`}
                    isActive={showLarryEntrance}
                    animationConfiguration={loaderStyle}
                    entranceDelay={
                      (whatsHappeningDelay + 2 + i) * loaderStyle.delayFactor
                    }
                    entranceOnly={true}
                    hasSkeletalLoading={true}
                  >
                    <li className={styles.whoToFollowItem}>
                      <StaticItem
                        src={
                          "./images/sidebar-right/who-to-follow/account-" +
                          (i + 1)
                        }
                      />
                    </li>
                  </Transition>
                );
              })}
            </ul>
            <Transition
              isActive={showLarryEntrance}
              animationConfiguration={loaderStyle}
              entranceDelay={10 * loaderStyle.delayFactor}
              entranceOnly={true}
            >
              <h4 className={`body ${styles.showMoreLabel}`}>Show more</h4>
            </Transition>
          </div>
        </Transition>
      </div>
    </div>
  );
};

export default SidebarRight;
