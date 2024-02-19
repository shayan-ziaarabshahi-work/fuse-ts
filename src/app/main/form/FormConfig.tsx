import { lazy } from "react";
import { authRoles } from "src/app/auth";
import createPageConfig from "src/app/utils/handlers/createPageConfig";

const Form = lazy(() => import("./Form"));

const FormConfig = createPageConfig({
  settings: {
    layout: {},
  },
  routes: [
    {
      path: "form",
      children: [
        {
          element: <Form />,
          path: "",
          title: "form",
        },
        {
          element: <Form />,
          path: ":id",
          title: "id",
        },
        {
          element: <Form />,
          path: ":id/etc",
          title: "id-etc",
        },
      ],
    },
  ],
});

export default FormConfig;
