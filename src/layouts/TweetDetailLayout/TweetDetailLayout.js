import styles from "./TweetDetailLayout.module.scss";
import { useParams, useNavigate } from "react-router-dom";
import { StaticItem } from "../../components";
import mockDataProvider from "../../dataprovider";
import { Link } from "react-router-dom";

const TweetDetailLayout = () => {
  let { tweetId } = useParams();
  const { handle, timestamp, copy, baseFakeReplies, replies, retweets, likes } =
    mockDataProvider.get().find((tweet) => tweet.id === tweetId);
  const { name, avatar, verified } =
    mockDataProvider.getAccountByHandle(handle);

  mockDataProvider.reset();
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

  return (
    <article>
      <header className={styles.header}>
        <Link to="/" className={styles.backBtn}>
          <img src="/images/icons/iconLeftArrow.svg" alt="go back" />
        </Link>
        <p className={`headline2 ${styles.headerTitle}`}>Tweet</p>
        <img
          className={styles.mockArrow}
          src="/images/icons/iconLeftArrow.svg"
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
                  src="/images/icons/IconVerified.svg"
                  alt="verified user"
                />
              )}
              <img src="/images/icons/iconDots.svg" alt="overflow menu" />
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
              <img src="/images/icons/IconRetweet.svg" alt="retweets" />
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
              <img src="/images/icons/IconReply.svg" alt="replies" />
            </span>
            <span className={`subtext2 ${styles.footerIcon}`}>
              <img src="/images/icons/IconRetweet.svg" alt="retweets" />
            </span>
            <span className={`subtext2 ${styles.footerIcon}`}>
              <img src="/images/icons/IconHeart.svg" alt="likes" />
            </span>
            <span className={`subtext2 ${styles.footerIcon}`}>
              <img src="/images/icons/IconOutgoing.svg" alt="share" />
            </span>
          </section>
        </footer>
      </main>
      <StaticItem className={styles.mockReplies} src="/images/mockimages/mockTweetReplies" />

      <StaticItem className={styles.mockReplyFooter} src="/images/mockimages/mockReplyFooter" />
    </article>
  );
};

export default TweetDetailLayout;
