import { createMuiTheme } from "@material-ui/core/styles";
import themeConfig from "./themeConfig";
import typography from "./typography";
import overrides from "./overrides";
import breakpoints from "./breakpoints";
import props from "./props";
import shadows from "./shadows";

export default createMuiTheme(
  {
    spacing: 4,
    breakpoints: breakpoints,
    overrides: overrides,
    props: props,
    typography: typography,
    shadows: shadows,
    palette: themeConfig.palette,
  },
  {
    name: themeConfig.name,
    header: themeConfig.header,
    footer: themeConfig.footer,
    sidebar: themeConfig.sidebar,
  }
);
