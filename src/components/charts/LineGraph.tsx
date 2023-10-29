import React, {useState} from "react";
import {Line} from "react-chartjs-2";
import 'chart.js/auto';

const LineGraph = () => {
    const [activeTab, setActiveTab] = useState('collections');

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: [0, 1000, 2000, 3000, 2500, 4000, 3500],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ]
    };

    const options = {
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Chart.js Line Chart',
            },
        },
    };

    return (
        <div className="flex flex-col border border-gray-100 rounded-lg p-3
        ">
            <div className="flex justify-between border border-gray-100 rounded-lg p-0 text-center">
                <button
                    className={`w-full px-3 py-1 rounded-lg ${activeTab === 'collections' ? 'bg-purple-900 text-white' : ''}`}
                    onClick={() => setActiveTab('collections')}
                >
                    Collections
                </button>
                <button
                    className={`px-3 py-1  rounded-lg ${activeTab === 'disbursements' ? 'bg-purple-900 text-white' : ''}`}
                    onClick={() => setActiveTab('disbursements')}
                >
                    Disbursements
                </button>
            </div>
            <Line options={options} data={data} type="line"/>
        </div>
    );
};

export default LineGraph;
