import { themeQuartz, iconSetMaterial } from '@ag-grid-community/theming'

// to use myTheme in an application, pass it to the theme grid option
export const myTheme = themeQuartz.withPart(iconSetMaterial).withParams({
    accentColor: '#1639FD',
    backgroundColor: '#242530',
    borderColor: '#41424D',
    borderRadius: '8px',
    browserColorScheme: 'dark',
    columnBorder: false,
    foregroundColor: '#FFFFFF',
    headerBackgroundColor: '#21222D',

    headerFontSize: 18,
    headerFontWeight: 500,
    fontSize: 16,
    headerRowBorder: true,
    rowBorder: false,
    sidePanelBorder: false,
    spacing: '8px',
    wrapperBorder: false,
})
