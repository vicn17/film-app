import { Accounts } from "../../config/firebase";
import { rank } from "../../public/img/ranking-svg";

const controlWebPages = [
  //* Page: select user
  {
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
  },

  //* Page: Login
  {
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
  },

  //* Page: sign up
  {
    path: "/signup",
    get: (req, res) => {
      return res.render("./web/SignUp");
    },
    post: [
      {
        path: "/createdAccount",
        reqHandle: async (req, res) => {
          try {
            //* Thêm tài khoản mới vào firebase
            const { acc_email, acc_name, acc_pass, enter_pass } = req.body;
            if (
              acc_email == "" ||
              acc_name == "" ||
              acc_pass == "" ||
              enter_pass == ""
            ) {
              return res.redirect("/signup");
            } else {
              //* Tạo tài khoản
              var date = new Date();
              await Accounts.add({
                acc_created_at: date,
                acc_email: acc_email,
                acc_pass: acc_pass,
                acc_role: 1,
                acc_users: [
                  {
                    ur_avatar: "chưa có",
                    ur_name: acc_name,
                    ur_role: 0,
                  },
                ],
              });
              return res.redirect("/login");
            }
          } catch (error) {
            res.redirect("/login");
          }
        },
      },
    ],
  },

  //* Page: browser
  {
    path: "/browser",
    get: async (req, res) => {
      try {
        const user = req.session.user;

        return res.render("./web/browser", {
          rank,
          acc_id: user.acc_id,
          ur_name: user.ur_name,
          ur_avatar: user.ur_avatar,
          otherUser: user.otherUser,
        });
      } catch (error) {
        return res.redirect("/login");
      }
    },
    post: [
      {
        path: "/selectUser",
        reqHandle: async (req, res) => {
          try {
            const { ur_name, ur_avatar } = req.body;

            //* set thông tin user vào session user
            let user = req.session.user;
            user.ur_name = ur_name;
            user.ur_avatar = ur_avatar;
            const accountUser = await Accounts.doc(user.acc_id).get();
            const otherUser = [];
            accountUser.data().acc_users.forEach((item) => {
              if (item.ur_name != user.ur_name) {
                otherUser.push(item);
              }
            });
            user.otherUser = otherUser;

            return res.redirect("/browser");
          } catch (error) {
            return res.redirect("/login");
          }
        },
      },
    ],
  },

  //* Log out
  {
    path: "/logout",
    get: (req, res) => {
      try {
        req.session.user && req.session.destroy(null);
        res.redirect("/");
      } catch (error) {
        res.send(error);
      }
    },
  },
];
export default controlWebPages;
