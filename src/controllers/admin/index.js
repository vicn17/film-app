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

            res.redirect("../film");
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
        page,
        detailFilm: snapshot.data(),
      });
    },
  },
  {
    path: "/admin/delete/:id",
    get: async (req, res) => {
      const snapshot = await Films.doc(req.params.id).get();
      if (req.params.id) {
        fs.unlink("../public/" + snapshot.data().f_poster, (err) => {
          if (err) {
            throw err;
          }
        });
        fs.unlink("../public/" + snapshot.data().f_banner, (err) => {
          if (err) {
            throw err;
          }
        });
        await Accounts.doc(req.params.id).delete();
      }
      res.redirect("..");
    },
  },
];

export default controlAdminPages;
