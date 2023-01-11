import { Accounts, Films } from "../../config/firebase";
// import { storage } from "../../config/firebase/storage";
// import { ref, uploadBytes } from "firebase/storage";

const controlAdminPages = [
  //* Home page admin
  {
    path: "/admin/:page",
    get: async (req, res) => {
      const page = req.params.page;
      res.render("./admin/Browser", { page });
    },
    post: [
      {
        path: "/admin/add/new-film",
        // upload: [
        //   {
        //     name: "f_poster",
        //     maxCount: 1,
        //   },
        //   {
        //     name: "f_banner",
        //     maxCount: 1,
        //   },
        // ],
        reqHandle: async (req, res) => {
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
          // const imgPoster = req.files.img_poster;
          // let pathImgPoster = "";
          // imgPoster.forEach((item) => {
          //   pathImgPoster = `${item.destination}${item.filename}`;
          // });

          // //* get img banner in form
          // const imgBanner = req.files.img_banner;
          // let pathImgBanner = "";
          // imgBanner.forEach((item) => {
          //   pathImgBanner = `${item.destination}${item.filename}`;
          // });
        },
      },
    ],
  },
];

export default controlAdminPages;
