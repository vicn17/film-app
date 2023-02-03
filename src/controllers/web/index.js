import addYourFavorite from "./addYourFavorite.handle";
import browser from "./browser.handle";
import defaultBrowser from "./default.handle";
import favorite from "./favorite.handle";
import login from "./login.handle";
import logOut from "./logOut.handle";
import profile from "./profile.handle";
import removeYourFavorite from "./removeYourFavorite.handle";
import signUp from "./signUp.handle";

const controlWebPages = [
  defaultBrowser,
  browser,
  signUp,
  login,
  logOut,
  favorite,
  addYourFavorite,
  removeYourFavorite,
  profile,
];

export default controlWebPages;
