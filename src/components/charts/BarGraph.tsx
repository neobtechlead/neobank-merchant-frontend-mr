// const config = {
//     type: 'bars',
//     data: data,
//     options: {
//         scales: {
//             y: {
//                 beginAtZero: true,
//                 grid: {
//                     display: true,
//                 },
//                 border: {
//                     display: false,
//                 },
//             },
//             x: {
//                 beginAtZero: true,
//                 grid: {
//                     display: false,
//                 },
//                 border: {
//                     display: false,
//                 },
//             },
//         },
//         plugins: {
//             legend: {
//                 display: true,
//                 align: 'end',
//                 usePointStyle: true,
//                 pointStyle: 'circle',
//                 pointStyleWidth: 1,
//                 useBorderRadius: true,
//                 borderRadius: 10
//             },
//         }
//     },
// };

import React from "react";
import {Bar} from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

const BarGraph = () => {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Collections',
                data: [65, 59, 80, 81, 56, 55, 40],
                backgroundColor: ['#FFCC99'],
                borderRadius: 5
            },
            {
                label: 'Disbursements',
                data: [65, 59, 80, 81, 56, 55, 40],
                backgroundColor: ['#59D3D4'],
                borderRadius: 5
            },
        ]
    };

    const options = {
        plugins: {
            legend: {
                position: 'top',
                display: 'flex',
                align: 'end',
                usePointStyle: true,
                pointStyle: 'circle',
                pointStyleWidth: 1,
                useBorderRadius: true,
                borderRadius: 10
            },
            title: {
                display: true,
                text: 'Total Counts',
            },
        },

        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    display: true,
                },
                border: {
                    display: false,
                },
            },
            x: {
                beginAtZero: true,
                grid: {
                    display: false,
                },
                border: {
                    display: false,
                },
            },
        },
    };

    return <div className="flex border border-gray-100 rounded-lg p-3 min-w-full min-h-[4rem]">
        <Bar options={options} data={data} type="bar"/>
    </div>;
};

export default BarGraph;
