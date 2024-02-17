import { GlobalStyles } from "@mui/material";

export default function CKEditorStyle() {
  return (
    <GlobalStyles
      styles={(theme) => {
        const backgroundColor = theme.palette.background.paper;
        const textColor = theme.palette.text.primary;
        const actionColor = theme.palette.text.secondary;
        const fontFamily = theme.typography.fontFamily;

        return {
          ".ck": {
            color: `${textColor} !important`,
            /* to sync colors with palette */
            border: `none !important`,
            outline: `none !important`,
            boxShadow: `none !important`,
          },
          // to not effecting colors of colors dropdown / table dropdown cells
          ".ck:not(.ck-color-grid__tile):not(.ck-insert-table-dropdown-grid-box)":
            {
              backgroundColor: `${backgroundColor} !important`,
            },
          // change it to explicit fonts dropdown
          ".ck:not(.ck-font-family-dropdown .ck-button__label)": {
            fontFamily: `${fontFamily} !important`,
          },
          // for headings dropdown texts
          ".ck-button": {
            justifyContent: "left !important",
          },
          // to specify active items
          ".ck-on, .ck-active": {
            outline: `2px solid ${actionColor} !important`,
          },
          // for dropdown box and items
          ".ck-dropdown__panel, .ck-dropdown__panel input, .ck-balloon-panel, .ck-balloon-panel input":
            {
              boxShadow: `${actionColor} 0px 2px 8px 0px !important`,
            },
          // content box
          ".ck-content": {
            padding: "2rem !important",
          },
          // a commercial box
          ".ck-powered-by": {
            display: "none !important",
          },
        };
      }}
    />
  );
}
