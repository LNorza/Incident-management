import { IOptions } from '../interface'

export const getDeviceTypeOptions: IOptions[] = [
    { label: 'PC', value: 'PC' },
    { label: 'Laptop', value: 'LAPTOP' },
    { label: 'Impresora', value: 'PRINTER' },
    { label: 'Switch', value: 'SWITCH' },
    { label: 'Router', value: 'ROUTER' },
    { label: 'Proyector', value: 'PROJECTOR' },
    { label: 'Regulador', value: 'VOLTAGE-REGULATOR' },
    { label: 'No-break', value: 'NO-BREAK' },
]

export const getBrandOptions: IOptions[] = [
    { label: 'HP', value: 'HP' },
    { label: 'Dell', value: 'DELL' },
    { label: 'Lenovo', value: 'LENOVO' },
    { label: 'Asus', value: 'ASUS' },
    { label: 'Acer', value: 'ACER' },
    { label: 'Apple', value: 'APPLE' },
    { label: 'Samsung', value: 'SAMSUNG' },
    { label: 'Cisco', value: 'CISCO' },
    { label: 'Linksys', value: 'LINKSYS' },
    { label: 'Koblenz', value: 'KOBLENZ' },
    { label: 'Epson', value: 'EPSON' },
]

export const getWarrantyYearsOptions: IOptions[] = [
    { label: '1 año', value: '1' },
    { label: '2 años', value: '2' },
    { label: '3 años', value: '3' },
    { label: '4 años', value: '4' },
    { label: '5 años', value: '5' },
]

export const getOsOptions: IOptions[] = [
    { label: 'Windows 11', value: 'WINDOWS_11' },
    { label: 'Windows 10', value: 'WINDOWS_10' },
    { label: 'Windows 8', value: 'WINDOWS_8' },
    { label: 'Windows 7', value: 'WINDOWS_7' },
    { label: 'Windows XP', value: 'WINDOWS_XP' },
    { label: 'Windows Vista', value: 'WINDOWS_VISTA' },
    { label: 'Linux', value: 'LINUX' },
    { label: 'Mac OS', value: 'MAC_OS' },
]

export const getRamTypeOptions: IOptions[] = [
    { label: 'DDR4', value: 'DDR4' },
    { label: 'DDR5', value: 'DDR5' },
]

export const getRouterTypeOptions: IOptions[] = [
    { label: 'ADSL', value: 'ADSL' },
    { label: 'Cable', value: 'CABLE' },
    { label: 'Fibra óptica', value: 'FIBER_OPTIC' },
    { label: 'Satelital', value: 'SATELLITE' },
    { label: '4G', value: '4G' },
    { label: '5G', value: '5G' },
]

export const getConnectivityRouterOptions: IOptions[] = [
    { label: 'Inalámbrica', value: 'WIRELESS' },
    { label: 'Cableada', value: 'WIRED' },
]

export const getRouterCapacityOptions: IOptions[] = [
    { label: '< 16 MB', value: '<16MB' },
    { label: '16-128 MB', value: '16-128MB' },
    { label: '128-1000 MB', value: '128-1000MB' },
    { label: '1000MB - 4GB', value: '1000MB-4GB' },
    { label: '4-16 GB', value: '4-16GB' },
    { label: '16-64 GB', value: '16-64GB' },
    { label: '>64 GB', value: '>64GB' },
]

export const getProjectorResolutionOptions: IOptions[] = [
    { label: 'SVGA (800x600)', value: 'SVGA' },
    { label: 'XGA (1024x768)', value: 'XGA' },
    { label: 'WXGA (1280x800)', value: 'WXGA' },
    { label: 'HD (1366x768)', value: 'HD' },
    { label: 'FHD (1920x1080)', value: 'FHD' },
    { label: '4K (3840x2160)', value: '4K' },
]

export const getProjectorConnectivityOptions: IOptions[] = [
    { label: 'HDMI', value: 'HDMI' },
    { label: 'VGA', value: 'VGA' },
    { label: 'USB', value: 'USB' },
]

export const getPrinterTypeOptions: IOptions[] = [
    { label: 'Laser', value: 'LASER' },
    { label: 'Inyección de tinta', value: 'INKJET' },
    { label: 'Matriz de punto', value: 'DOT_MATRIX' },
]

export const getInkOptions: IOptions[] = [
    { label: 'Tinta a base de agua', value: 'WATER_BASED_INK' },
    { label: 'Tinta a base de aceite', value: 'OIL_BASED_INK' },
    { label: 'Tinta a base de solvente', value: 'SOLVENT_BASED_INK' },
]
