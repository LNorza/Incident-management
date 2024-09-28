import { themeQuartz, iconSetQuartzBold } from '@ag-grid-community/theming';

// to use myTheme in an application, pass it to the theme grid option
export const myTheme = themeQuartz
  .withPart(iconSetQuartzBold)
  .withParams({
    accentColor: "#1639FD",
    backgroundColor: "#242530",
    borderColor: "#41424D",
    borderRadius: "8px",
    browserColorScheme: "dark",
    columnBorder: false,
    fontFamily: {
      googleFont: "Inter"
    },
    foregroundColor: "#FFFFFF",
    headerBackgroundColor: "#21222D",
    headerFontFamily: {
      googleFont: "Inter"
    },
    headerFontSize: 14,
    headerRowBorder: true,
    rowBorder: false,
    sidePanelBorder: false,
    spacing: "8px",
    wrapperBorder: false
  });
