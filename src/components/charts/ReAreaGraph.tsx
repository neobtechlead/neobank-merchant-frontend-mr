import React from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import {IAreaGraphProps} from "@/utils/interfaces/IReGraphProps";


const ReAreaGraph: React.FC<IAreaGraphProps> = ({data}) => {
    return (
        <ResponsiveContainer width="99%" height={250}>
            <AreaChart data={data} margin={{top: 30}}>
                <defs>
                    <linearGradient id="colorCollections" x1="1" y1="0" x2="1" y2="1">
                        <stop offset="23%" stopColor="#652D90" stopOpacity={0.9}/>
                        <stop offset="100%" stopColor="#652D90" stopOpacity={0.3}/>
                    </linearGradient>
                </defs>
                <XAxis dataKey="name" style={{stroke: 'transparent'}}/>
                <YAxis style={{stroke: 'transparent'}}/>
                <CartesianGrid stroke={'transparent'}/>

                <Tooltip cursor={false} separator=""/>
                <Area dataKey="collections" stroke="#652D90" fillOpacity={1} fill="url(#colorCollections)"/>
            </AreaChart>
        </ResponsiveContainer>
    );
};

export default ReAreaGraph;
