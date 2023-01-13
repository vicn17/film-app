import { SDK_VERSION } from "firebase-admin";
import { Accounts, Films } from "../../config/firebase";
const fs = require("fs");
// import { storage } from "../../config/firebase/storage";
// import { ref, uploadBytes } from "firebase/storage";

const controlAdminPages = [
  //* Home page admin
  {
    path: "/admin/:page",
    get: async (req, res) => {
      const page = req.params.page;
      let listFilms = "";
      let detailFilm = "";
      if (page === "film") {
        const snapshot = await Films.get();
        listFilms = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        return res.render("./admin/Browser", { page, listFilms });
      }
      return res.render("./admin/Browser", { page });
    },
    post: [
      {
        path: "/admin/add/new-film",
        upload: [
          {
            name: "f_poster",
            maxCount: 1,
          },
          {
            name: "f_banner",
            maxCount: 1,
          },
        ],
        reqHandle: async (req, res) => {
          try {
            const {
              f_category,
              f_title,
              f_actor,
              f_character,
              f_directors,
              f_country,
              f_trailer,
              f_description,
            } = req.body;

            //* get img post in form
            const imgPoster = req.files.f_poster;
            let pathImgPoster = "";
            imgPoster.forEach((item) => {
              pathImgPoster = `uploads/${item.filename}`;
            });

            //* get img banner in form
            const imgBanner = req.files.f_banner;
            let pathImgBanner = "";
            imgBanner.forEach((item) => {
              pathImgBanner = `uploads/${item.filename}`;
            });

            //* add database
            var date = new Date();
            await Films.add({
              f_category: f_category,
              f_title: f_title,
              f_actor: f_actor,
              f_character: f_character,
              f_directors: f_directors,
              f_country: f_country,
              f_trailer: f_trailer,
              f_video: "",
              f_description: f_description,
              f_poster: pathImgPoster,
              f_banner: pathImgBanner,
              f_created_at: date,
              f_views: 0,
            });

            const snapshot = await Films.where(
              "f_poster",
              "==",
              pathImgPoster
            ).get();
            const detailFilm = snapshot.docs.map((doc) => doc.id);

            res.redirect(`/detail/${detailFilm}`);
          } catch (error) {
            res.send("khong them dc");
          }
        },
      },
    ],
  },
  {
    path: "/detail/:id",
    get: async (req, res) => {
      const page = "detail";
      const snapshot = await Films.doc(req.params.id).get();
      res.render("./admin/Browser", {
        idFilm: req.params.id,
        page,
        detailFilm: snapshot.data(),
      });
    },
    put: [
      {
        path: "/update/edit-film",
        upload: [
          {
            name: "f_poster",
            maxCount: 1,
          },
          {
            name: "f_banner",
            maxCount: 1,
          },
        ],
        reqHandle: async (req, res) => {
          try {
            const {
              f_id,
              f_category,
              f_title,
              f_actor,
              f_character,
              f_directors,
              f_country,
              f_trailer,
              f_description,
              old_poster,
              old_banner,
            } = req.body;

            //* Kiểm tra file upload poster có giá trị ko, nếu có thì xóa cái cũ, ko có thì ko thực thi
            let pathImgPoster = "";
            if (req.files.f_poster) {
              const filePosterPath = `./src/public/${old_poster}`;
              fs.access(filePosterPath, (error) => {
                if (!error) {
                  fs.unlinkSync(filePosterPath);
                } else {
                  console.error("Error occured:", error);
                }
              });

              //* get img post in form
              const imgPoster = req.files.f_poster;
              imgPoster.forEach((item) => {
                pathImgPoster = `uploads/${item.filename}`;
              });
            }

            //* Kiểm tra file upload banner có giá trị ko, nếu có thì xóa cái cũ, ko có thì ko thực thi
            let pathImgBanner = "";
            if (req.files.f_banner) {
              const fileBannerPath = `./src/public/${old_banner}`;
              fs.access(fileBannerPath, (error) => {
                if (!error) {
                  fs.unlinkSync(fileBannerPath);
                } else {
                  console.error("Error occured:", error);
                }
              });

              //* get img banner in form
              const imgBanner = req.files.f_banner;
              imgBanner.forEach((item) => {
                pathImgBanner = `uploads/${item.filename}`;
              });
            }

            const dataUpdate = {
              f_category: f_category,
              f_title: f_title,
              f_actor: f_actor,
              f_character: f_character,
              f_directors: f_directors,
              f_country: f_country,
              f_trailer: f_trailer,
              f_description: f_description,
              f_poster: pathImgPoster === "" ? old_poster : pathImgPoster,
              f_banner: pathImgBanner === "" ? old_banner : pathImgBanner,
            };

            await Films.doc(f_id).update(dataUpdate);
            res.redirect("back");
          } catch (error) {
            console.log(error);
            res.send("lỗi r");
          }
        },
      },
    ],
    delete: [
      {
        path: "/admin/delete/:id",
        reqHandle: async (req, res) => {
          try {
            const snapshot = await Films.doc(req.params.id).get();
            const filePosterPath = `./src/public/${snapshot.data().f_poster}`;
            fs.access(filePosterPath, (error) => {
              if (!error) {
                fs.unlinkSync(filePosterPath);
              } else {
                console.error("Error occured:", error);
              }
            });
            const fileBannerPath = `./src/public/${snapshot.data().f_banner}`;
            fs.access(fileBannerPath, (error) => {
              if (!error) {
                fs.unlinkSync(fileBannerPath);
              } else {
                console.error("Error occured:", error);
              }
            });
            await Films.doc(req.params.id).delete();
            res.redirect("back");
          } catch (error) {
            console.log(error);
          }
        },
      },
    ],
  },
];

export default controlAdminPages;
