import routerAdmin from "./router.admin";
import routerWeb from "./router.web";

const route = (app) => {
  app.use("/", routerWeb);
  app.use("/admin", routerAdmin);
};

export default route;
