import { lazy } from "react";
import createPageConfig from "src/app/utils/handlers/createPageConfig";

const CKEditor = lazy(() => import("./CKEditor"));

const CKEditorConfig = createPageConfig({
  settings: {
    layout: {},
  },
  routes: [
    {
      path: "ck-editor",
      element: <CKEditor />,
    },
  ],
});

export default CKEditorConfig;
