import ReactApexChart from "react-apexcharts";
import ApexCharts from "apexcharts";

// Función para convertir fecha en formato "YYYY-MM-DD" a timestamp
const convertDateToTimestamp = (dateString: string) => new Date(dateString).getTime();

export const AreaChart: React.FC = () => {
    const series = [
        {
            name: "Incidencias",
            data: [
                [convertDateToTimestamp("2020-01-01"), 1],
                [convertDateToTimestamp("2020-02-02"), 4],
                [convertDateToTimestamp("2020-03-03"), 20],
                [convertDateToTimestamp("2020-04-04"), 12],
                [convertDateToTimestamp("2020-05-04"), 16],
                [convertDateToTimestamp("2020-06-04"), 8],
                [convertDateToTimestamp("2020-07-04"), 10],
            ],
        },
    ];

    const options: ApexCharts.ApexOptions = {
        chart: {
            height: 250,
            type: "area",
            toolbar: {
                show: false, // Muestra el menú de herramientas (descargar, etc.)
                tools: {
                    download: false, // Habilita la opción de descarga
                },
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: "straight", // Cambia "smooth" a "straight" si prefieres líneas rectas
            colors: ["#C84242"], // Cambia este color si deseas una línea diferente
        },
        colors: ["#C84242"], // Cambia el color de la serie
        fill: {
            type: "gradient",
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                stops: [1, 100],
                gradientToColors: ["#000", "#f0f0f0"], // Cambia estos colores del gradiente
            },
        },
        xaxis: {
            type: "datetime",
            labels: {
                style: {
                    colors: "#ffffff", // Cambia el color de las fechas a blanco
                },
            },
        },
        yaxis: {
            labels: {
                style: {
                    colors: "#ffffff", // Cambia el color de los valores a blanco
                },
            },
        },
        tooltip: {
            theme: "dark", // Cambia el tema del tooltip a oscuro
            style: {
                fontSize: "14px",
                fontFamily: "Inter, system-ui",
            },
            x: {
                format: "dd MMM yyyy", // Formato de fecha en el tooltip
            },
        },
        grid: {
            show: false, // Remueve las líneas de cuadrícula
        },
    };

    return (
        <div>
            <div id="chart">
                <div id="chart-timeline">
                    <ReactApexChart options={options} series={series} type="area" height={350} />
                </div>
            </div>
        </div>
    );
};
