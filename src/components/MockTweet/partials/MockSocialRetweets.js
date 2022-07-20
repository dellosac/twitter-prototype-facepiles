import mockDataProvider from "../../../dataprovider";
import styles from "./MockSocialRetweets.module.scss";

const MockSocialRetweets = ({ socialretweets }) => {
  const copy = `${socialretweets.map((socialRetweet, index) => {
    const account = mockDataProvider.getAccountByHandle(socialRetweet);
    const isLast = index + 1 === socialretweets.length;
    const singleSocialRetweet = socialretweets.length < 2;

    return `${isLast && !singleSocialRetweet ? "and " : ""}${account.name}${
      isLast ? "" : ","
    }`;
  })} retweeted`;

  return (
    <section className={styles.root}>
      <img className={styles.icon} src="/images/icons/IconSocialRetweet.svg" alt="social retweet" />
      <span className="subtext2">
        {copy}
      </span>
    </section>
  );
};

export default MockSocialRetweets;
