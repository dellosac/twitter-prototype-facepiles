import { StaticItem } from "../../components";
import mockDataProvider from "../../dataprovider";
import styles from "./MockTweetReply.module.scss";
import { useNavigate } from "react-router-dom";

const MockTweetReply = ({ id, show, handle, copy, timestamp, replyingTo }) => {
  let navigate = useNavigate();
  const { avatar, name, verified } = mockDataProvider.getAccountByHandle(handle);

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
    <li className={styles.root}>
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
                src="/images/icons/Verified.svg"
                alt="verified user"
              />
            )}
            <p className={styles.headerMetaHandle}>{handle}</p>
            <p className={styles.dot}>·</p>
            <p className={styles.headerMetaTimestamp}>1h</p>
            <img
              className={styles.overflowMenuButton}
              src="/images/icons/Dots.svg"
              alt="overflow menu"
            />
          </div>
          <div className={styles.replyToCopy}>Replying to <span className={styles.replyToHandle}>{replyingTo}</span></div>
          <div className={styles.copy}>{copy}</div>
        </article>
      </header>
    </li>
  );
};

export default MockTweetReply;
