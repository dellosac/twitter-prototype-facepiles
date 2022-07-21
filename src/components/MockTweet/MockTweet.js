import React from "react";
import styles from "./MockTweet.module.scss";
import StaticItem from "../StaticItem";
import MockSocialRetweets from "./partials/MockSocialRetweets";
import { Facepiles } from "../../components";
import { useNavigate } from "react-router-dom";

const MockTweet = ({
  id,
  likes,
  retweets,
  copy,
  tweetAccount,
  timestamp,
  baseFakeReplies,
  replies,
  showFacePiles,
  socialretweets,
  facePileDirection
}) => {
  const { avatar, name, handle, verified } = tweetAccount;
  const hasSocialRetweets = socialretweets.length > 0;
  let navigate = useNavigate();

  // Events
  const onRootClick = (e) => {
    e.preventDefault();
    navigate(`/mock/tweet/detail/${id}`);
  }

  const onAvatarClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/mock/profile/${handle}`);
  }

  const onHeaderMetaClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/mock/profile/${handle}`);
  }

  const onReplyIconClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/mock/tweet/composer/${handle}`);
  }

  const onRetweetClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
  }

  const onLikeClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
  }

  const onOutgoingClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
  }

  const repliesToShow = replies.filter(reply => reply.show);

  return (
    <section className={`${styles.root}`} onClick={onRootClick}>
      {hasSocialRetweets && (
        <MockSocialRetweets socialretweets={socialretweets} />
      )}
      <header className={styles.header}>
        <StaticItem
          className={styles.avatarIcon}
          src={`/images/accounts/${avatar}`}
          onClick={onAvatarClick}
        />
        <article className={styles.article}>
          {/* TODO: Move into partial */}
          <div className={styles.headerMeta} onClick={onHeaderMetaClick}>
            <p className={styles.headerMetaName}>{name}</p>
            {verified && (
              <img
                className={styles.vertifiedIcon}
                src="/images/icons/IconVerified.svg"
                alt="verified user"
              />
            )}
            <p className={styles.headerMetaHandle}>{handle}</p>
            <p className={styles.dot}>·</p>
            <p className={styles.headerMetaTimestamp}>{timestamp}</p>
            <img className={styles.overflowMenuButton} src="/images/icons/iconDots.svg" alt="overflow menu" />
          </div>
          <div className={styles.copy}>{copy}</div>
        </article>
      </header>
      <footer
        className={`${styles.footer} ${
          showFacePiles ? "" : styles.noFacePiles
        }`}
      >
        {showFacePiles && (
          <div className={styles.facepilesWrapper}>
            <Facepiles className={styles.facepiles} replies={repliesToShow} direction={facePileDirection} />
          </div>
        )}
        <section className={styles.footerIcons}>
          <span className={`subtext2 ${styles.footerIcon}`} onClick={onReplyIconClick}>
            <img src="/images/icons/IconReply.svg" alt="replies" />
            {baseFakeReplies + repliesToShow.length}
          </span>
          <span className={`subtext2 ${styles.footerIcon}`} onClick={onRetweetClick}>
            <img src="/images/icons/IconRetweet.svg" alt="retweets" />
            {retweets}
          </span>
          <span className={`subtext2 ${styles.footerIcon}`} onClick={onLikeClick}>
            <img src="/images/icons/IconHeart.svg" alt="likes" />
            {likes}
          </span>
          <span className={`subtext2 ${styles.footerIcon}`} onClick={onOutgoingClick}>
            <img src="/images/icons/IconOutgoing.svg" alt="share" />
          </span>
        </section>
      </footer>
    </section>
  );
};

export default MockTweet;
