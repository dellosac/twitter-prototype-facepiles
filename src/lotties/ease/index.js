import Bookmark_Active from "./Bookmark_Active.json";
import Bookmark_Hover from "./Bookmark_Hover.json";
import Explore_Active from "./Explore_Active.json";
import Explore_Hover from "./Explore_Hover.json";
import Home_Active from "./Home_Active.json";
import Home_Hover from "./Home_Hover.json";
import List_Active from "./List_Active.json";
import List_Hover from "./List_Hover.json";
import Messages_Active from "./Messages_Active.json";
import Messages_Hover from "./Messages_Hover.json";
import Notification_Active from "./Notification_Active.json";
import Notification_Hover from "./Notification_Hover.json";
import Profile_Active from "./Profile_Active.json";
import Profile_Hover from "./Profile_Hover.json";

const Ease = {
  Home: {
    hover: Home_Hover,
    active: Home_Active,
  },
  Explore: {
    hover: Explore_Hover,
    active: Explore_Active,
  },
  Notifications: {
    hover: Notification_Hover,
    active: Notification_Active,
  },
  Messages: {
    hover: Messages_Hover,
    active: Messages_Active,
  },
  Bookmarks: {
    hover: Bookmark_Hover,
    active: Bookmark_Active,
  },
  Lists: {
    hover: List_Hover,
    active: List_Active,
  },
  Profile: {
    hover: Profile_Hover,
    active: Profile_Active,
  }
};

export default Ease;