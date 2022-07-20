import ACCOUNTS from "./accounts.json";
import TWEETS from "./tweets.json";

const MOCK_DATA = {
  ACCOUNTS,
};

class MockDataProviderSingleton {
  constructor() {
    const clonedTweetsArray = [...TWEETS]

    this._timeline = clonedTweetsArray;
    this._timer = null;
    this.setupTimer();

    console.log("MOCK_DATA", MOCK_DATA.ACCOUNTS);
  }

  checkToAddTweet() {
    if (Math.random() >= 0.3) {
      const randomTweetIndex = Math.floor(Math.random() * (this._timeline.length))
      let randomTweetReply = this._timeline[randomTweetIndex].replies.find(reply => !reply.show);
      console.log("randomTweetReply", randomTweetReply);
      randomTweetReply.show = true;

      console.log("this._timeline reply", this._timeline)
      // this._timeline.forEach(tweet => {
      //   let reply = tweet.replies.find(reply => !reply.show);
      //   reply.show = true;
      // })
    }
  }

  setupTimer() {
    this._timer = setInterval(() => {
      this.checkToAddTweet();
    }, 500);
  }

  reset() {
    console.log("reset");
    this._timeline.splice(0, this._timeline.length);
    const clonedTweetsArray = [...TWEETS]

    this._timeline.push(...clonedTweetsArray);
  }

  add(tweet) {
    this._timeline.push(tweet);
  }

  get() {
    return this._timeline;
  }

  getAccountByHandle(handle) {
    const foundAccount = ACCOUNTS.find(account => account.handle === handle);

    return foundAccount || "";
  }
}

const mockDataProvider = new MockDataProviderSingleton();
Object.freeze(mockDataProvider);

export default mockDataProvider;
