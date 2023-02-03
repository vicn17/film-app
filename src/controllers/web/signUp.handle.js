import { Accounts } from "../../config/firebase";

//* Page: sign up
const signUp = {
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
              acc_favorite: "",
            });
            return res.redirect("/login");
          }
        } catch (error) {
          res.redirect("/login");
        }
      },
    },
  ],
};

export default signUp;
