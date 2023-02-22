// import { SDK_VERSION } from "firebase-admin";
import loginAdmin from "./loginAdmin.handle";
import detailFilm from "./detailFilm.handle";
import selectPage from "./selectPageAdmin.handle";
import deleteCate from "./deleteCate.handle";

const controlAdminPages = [loginAdmin, selectPage, detailFilm, deleteCate];

export default controlAdminPages;
