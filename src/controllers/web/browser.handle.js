import { rank } from "../../public/img/ranking-svg";
import { Accounts, Category, Films } from "../../config/firebase";

//* Page: browser
const browser = {
  path: "/browser",
  get: async (req, res) => {
    try {
      const user = req.session.user;

      const category = await Category.orderBy("index", "asc").get();

      const listCate = category.docs.map((doc) => doc.id);

      const scienceFiction = await Films.where(
        "f_category",
        "==",
        "Khoa học viễn tưởng"
      ).get();
      const listScienceFiction = scienceFiction.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const cartoon = await Films.where("f_category", "==", "Hoạt hình").get();
      const listCartoon = cartoon.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const filmsByCate = {
        scienceFiction: listScienceFiction,
        cartoons: listCartoon,
      };

      return res.render("./web/browser", {
        rank,
        ur_name: user.ur_name,
        ur_avatar: user.ur_avatar,
        otherUser: user.otherUser,
        category: listCate,
        filmsByCate,
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
          // user.acc_favorite = accountUser.data().acc_favorite;
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
};

export default browser;
