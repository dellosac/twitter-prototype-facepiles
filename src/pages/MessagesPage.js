import Page from "./Page";
import styles from "./Messages.module.scss";
import { StaticItem, Transition } from "../components";

const MessagesPage = ({ pageLoaderConfig, slug }) => {
  return (
    <Page slug={slug} pageLoaderConfig={pageLoaderConfig}>
      <article className={styles.messagesPage}>
        <Transition 
          isActive={true}
          animationConfiguration={pageLoaderConfig}
          entranceDelay={0 * pageLoaderConfig.delayFactor}
        >
          <ul className={styles.messageWrapper}>
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
                    <StaticItem src={'./images/pages/messages/messages-' + (i + 1)} />
                  </li>
                </Transition>
              );
            })}
          </ul>
        </Transition>
        <div className={styles.messageViewer}>
          <div className={styles.messageLockup}>
            <h1 className={`title2 ${styles.copy1}`}>Select a message</h1>
            <h2 className={`body ${styles.copy2}`}>Choose from your exisiting conservations, start a new one, or just keep swimming.</h2>
            <div className={`headline2 ${styles.newMessageCTA}`}>New message</div>
          </div>
        </div>
      </article>    
    </Page>
  );
};

export default MessagesPage;