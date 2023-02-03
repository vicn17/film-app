// import { SDK_VERSION } from "firebase-admin";
import loginAdmin from "./loginAdmin.handle";
import detailFilm from "./detailFilm.handle";
import selectPage from "./selectPageAdmin.handle";

const controlAdminPages = [loginAdmin, selectPage, detailFilm];

export default controlAdminPages;
