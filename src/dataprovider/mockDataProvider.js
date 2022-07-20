import ACCOUNTS from "./accounts.json";
import TWEETS from "./tweets.json";

const MOCK_DATA = {
  ACCOUNTS,
};

class MockDataProviderSingleton {
  constructor() {
    const clonedTweetsArray = JSON.parse(JSON.stringify(TWEETS));

    this._timeline = clonedTweetsArray;
    this._timer = null;
    // this.setupTimer();
  }

  checkToAddTweet() {
    if (Math.random() >= 0.3) {
      const randomTweetIndex = Math.floor(Math.random() * (this._timeline.length))
      let randomTweetReply = this._timeline[randomTweetIndex].replies.find(reply => !reply.show);
      if(!!randomTweetReply) {
        randomTweetReply.show = true;
      }
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
    clearInterval(this._timer);

    const clonedTweetsArray = JSON.parse(JSON.stringify(TWEETS));

    this._timeline = clonedTweetsArray;

    this._timer = null;
    console.log("reset", this._timeline);
  }

  add(tweet) {
    this._timeline.push(tweet);
  }

  get() {
    if(this._timer === null) {
      this.setupTimer();
    }

    return this._timeline;
  }

  getAccountByHandle(handle) {
    const foundAccount = ACCOUNTS.find(account => account.handle === handle);

    return foundAccount || "";
  }
}

const mockDataProvider = new MockDataProviderSingleton();
// Object.freeze(mockDataProvider);

export default mockDataProvider;
