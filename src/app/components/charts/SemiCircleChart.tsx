import ReactApexChart from "react-apexcharts";

export const SemiCircleChart = () => {
    const series = [76];

    const options: ApexCharts.ApexOptions = {
        chart: {
            type: "radialBar",
            toolbar: {
                show: false, // Opcional, oculta la barra de herramientas del gráfico
            },
        },
        plotOptions: {
            radialBar: {
                startAngle: -90,
                endAngle: 90,
                track: {
                    background: "#2B2B36",
                    strokeWidth: "90%", // Aumenta el grosor de la barra radial
                    margin: 1, // Espacio entre la barra y el fondo
                },
                dataLabels: {
                    name: {
                        show: false,
                    },
                    value: {
                        fontSize: "20px",
                        color: "#FFFFFF",
                    },
                },
            },
        },
        fill: {
            colors: ["#a9dfd8"],
        },
        grid: {
            padding: {
                top: -20,
                bottom: 0,
                left: 0,
                right: 0,
            },
        },
    };

    return (
        <div id="chart" style={{ display: "flex", justifyContent: "center" }}>
            <ReactApexChart options={options} series={series} type="radialBar" width={400} height={340} />
        </div>
    );
};
