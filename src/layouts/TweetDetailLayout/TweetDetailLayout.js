import styles from "./TweetDetailLayout.module.scss";
import { useParams, useNavigate } from "react-router-dom";
import { StaticItem, MockTweetReply, Facepiles } from "../../components";
import mockDataProvider from "../../dataprovider";
import { Link } from "react-router-dom";

const TweetDetailLayout = () => {
  let { tweetId } = useParams();
  const { handle, timestamp, copy, baseFakeReplies, replies, retweets, likes } =
    mockDataProvider.get().find((tweet) => tweet.id === tweetId);
  const { name, avatar, verified } =
    mockDataProvider.getAccountByHandle(handle);

  const repliesToShow = replies.filter((reply) => reply.show);

  let navigate = useNavigate();

  // Events
  const onAvatarClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/mock/profile/${handle}`);
  };

  const onHeaderMetaClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/mock/profile/${handle}`);
  };

  let facePileReplies = replies;
  if(replies.length >= 4) {
    facePileReplies = replies.slice(replies.length - 3, replies.length);
  }

  return (
    <article>
      <header className={styles.header}>
        <Link to="/" className={styles.backBtn}>
          <img src="/images/icons/LeftArrow.svg" alt="go back" />
        </Link>
        <p className={`headline2 ${styles.headerTitle}`}>Tweet</p>
        <img
          className={styles.mockArrow}
          src="/images/icons/LeftArrow.svg"
          alt="go back"
        />
      </header>
      <main className={styles.tweetDetail}>
        <section className={styles.accountMeta}>
          <StaticItem
            className={styles.avatarIcon}
            src={`/images/accounts/${avatar}`}
            onClick={onAvatarClick}
          />
          <div onClick={onHeaderMetaClick}>
            <div className={styles.headerMeta}>
              <p className={styles.headerMetaName}>{name}</p>
              {verified && (
                <img
                  className={styles.vertifiedIcon}
                  src="/images/icons/Verified.svg"
                  alt="verified user"
                />
              )}
              <img
                className={styles.overflowMenuButton}
                src="/images/icons/Dots.svg"
                alt="overflow menu"
              />
            </div>
            <div className={styles.headerMeta}>
              <p className={styles.headerMetaHandle}>{handle}</p>
            </div>
          </div>
        </section>
        <section className={styles.copyArea}>{copy}</section>
        <p className={styles.timestampFooter}>{timestamp}</p>
        <footer className={`${styles.footer}`}>
          <section className={styles.footerIcons}>
            <span className={`subtext2 ${styles.footerIcon}`}>
              <img src="/images/icons/Retweet.svg" alt="retweets" />
              {retweets} Retweets
            </span>
            <span className={`subtext2 ${styles.footerIcon}`}>
              {Math.floor(retweets / 3)} Quote Tweets
            </span>
            <span className={`subtext2 ${styles.footerIcon}`}>
              {likes} Likes
            </span>
          </section>
        </footer>
        <footer className={`${styles.footer} ${styles.footerIconWrapper}`}>
          <section className={styles.footerIcons}>
            <span className={`subtext2 ${styles.footerIcon}`}>
              <img src="/images/icons/Reply.svg" alt="replies" />
            </span>
            <span className={`subtext2 ${styles.footerIcon}`}>
              <img src="/images/icons/Retweet.svg" alt="retweets" />
            </span>
            <span className={`subtext2 ${styles.footerIcon}`}>
              <img src="/images/icons/Heart.svg" alt="likes" />
            </span>
            <span className={`subtext2 ${styles.footerIcon}`}>
              <img src="/images/icons/Outgoing.svg" alt="share" />
            </span>
          </section>
        </footer>
      </main>
      <section className={styles.replySection}>
        <div className={styles.replyMetaSection}>
          <div className={`${styles.facepileWrapper} subtext3`}>
            <Facepiles
              shouldAnimate={false}
              replies={facePileReplies}
              direction={""}
              showUnreadNotification={false}
            />
            <span className={styles.facepileSpan}>
              {baseFakeReplies + replies.length} replies
            </span>
          </div>
          <div className="subtext2">Last Reply 30s ago</div>
        </div>
        <ul className={styles.repliesList}>
          {replies.map((reply) => {
            return (
              <MockTweetReply
                key={`reply-${reply.id}`}
                {...reply}
                replyingTo={handle}
              />
            );
          })}
        </ul>
      </section>
      <StaticItem
        className={styles.mockReplyFooter}
        src="/images/mockimages/mockReplyFooter"
      />
    </article>
  );
};

export default TweetDetailLayout;
