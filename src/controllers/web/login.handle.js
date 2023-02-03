import { Accounts } from "../../config/firebase";

//* Page: Login
const login = {
  path: "/login",
  get: (req, res) => {
    return res.render("./web/Login");
  },
  post: [
    {
      path: "/checkLogin",
      reqHandle: async (req, res) => {
        //* Lấy tất cả tài khoản
        // const snapshot = await Accounts.get();
        // const listAccount = snapshot.docs.map((doc) => ({
        //   id: doc.id,
        //   ...doc.data(),
        // }));
        try {
          const { acc_email, acc_pass } = req.body;
          const checkAccount = await Accounts.where(
            "acc_email",
            "==",
            acc_email
          )
            .where("acc_pass", "==", acc_pass)
            .get();
          if (!checkAccount.empty) {
            const oneAccount = await checkAccount.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            req.session.user = { acc_id: oneAccount[0].id };
            res.redirect("/");
          } else {
            res.redirect("back");
          }
        } catch (error) {
          res.redirect("/login");
        }
      },
    },
    {
      path: "/changeUser",
      reqHandle: async (req, res) => {
        const { ur_avatar, ur_name } = req.body;
        req.session.user.ur_name = ur_name;
        req.session.user.ur_avatar = ur_avatar;
        req.session.user.otherUser = [];
        const otherUser = await Accounts.doc(req.session.user.acc_id).get();
        otherUser.data().acc_users.forEach((item) => {
          item.ur_name != ur_name && req.session.user.otherUser.push(item);
        });
        res.redirect("/");
      },
    },
  ],
};

export default login;
