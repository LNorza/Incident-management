import React from 'react'
import ReactApexChart from 'react-apexcharts'

interface SemiCircleChartProps {
    percentage: number
}

export const SemiCircleChart: React.FC<SemiCircleChartProps> = ({ percentage }) => {
    // Redondear el porcentaje a 2 decimales
    const roundedPercentage = Math.min(Math.max(Math.round(percentage * 100) / 100, 0), 100)

    const options: ApexCharts.ApexOptions = {
        chart: {
            type: 'radialBar',
            toolbar: {
                show: false, // Opcional, oculta la barra de herramientas del gráfico
            },
        },
        plotOptions: {
            radialBar: {
                startAngle: -90,
                endAngle: 90,
                track: {
                    background: '#2B2B36',
                    strokeWidth: '90%', // Aumenta el grosor de la barra radial
                    margin: 1, // Espacio entre la barra y el fondo
                },
                dataLabels: {
                    name: {
                        show: false,
                    },
                    value: {
                        fontSize: '20px',
                        color: '#FFFFFF',
                        formatter: () => `${roundedPercentage}%`, // Mostrar el porcentaje
                    },
                },
            },
        },
        fill: {
            colors: ['#a9dfd8'],
        },
        grid: {
            padding: {
                top: -20,
                bottom: 0,
                left: 0,
                right: 0,
            },
        },
    }

    return (
        <div id="chart" style={{ display: 'flex', justifyContent: 'center' }}>
            <ReactApexChart options={options} series={[roundedPercentage]} type="radialBar" width={400} height={340} />
        </div>
    )
}
