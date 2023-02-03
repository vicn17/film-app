import { Accounts } from "../../config/firebase";

//* Page: favorite
const favorite = {
  path: "/favorite",
  get: async (req, res) => {
    const user = req.session.user;
    const favoriteList = await Accounts.doc(req.session.user.acc_id)
      .get()
      .then((snapshot) => snapshot.data());
    res.render("./web/Favorite", {
      acc_id: user.acc_id,
      ur_name: user.ur_name,
      ur_avatar: user.ur_avatar,
      otherUser: user.otherUser,
      favoriteList: favoriteList.acc_favorite,
    });
  },
};

export default favorite;
