import { Accounts } from "../../config/firebase";

//* Page: select user
const defaultBrowser = {
  path: "/",
  get: async (req, res) => {
    try {
      //* render when isset user
      let user = req.session.user;
      if (user.ur_name && user.ur_name != "") {
        res.redirect("/browser");
      } else {
        const acc_id = user.acc_id;
        const users = await Accounts.doc(acc_id).get();

        res.render("./web/SelectBrowser", {
          users: users.data().acc_users,
          acc_id: acc_id,
        });
      }
    } catch (error) {
      res.redirect("/login");
    }
  },
};

export default defaultBrowser;
