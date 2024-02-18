import { lazy } from "react";
import { authRoles } from "src/app/auth";
import createPageConfig from "src/app/utils/handlers/createPageConfig";

const Secret = lazy(() => import("./Secret"));

const SecretConfig = createPageConfig({
  settings: {
    layout: {},
  },
  auth: authRoles.staff,
  routes: [
    {
      path: "secret",
      children: [
        {
          element: <Secret />,
          path: "",
          title: "home",
        },
        {
          element: <Secret />,
          path: ":id",
          title: "id",
        },
        {
          element: <Secret />,
          path: ":id/etc",
          title: "id-etc",
        },
      ],
    },
  ],
});

export default SecretConfig;
