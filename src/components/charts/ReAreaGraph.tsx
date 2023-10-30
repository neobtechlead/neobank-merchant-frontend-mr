import React, {PureComponent} from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

const data = [
    {
        name: 'Jan',
        uv: 5,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Feb',
        uv: 10,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Mar',
        uv: 30,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Apr',
        uv: 30,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'May',
        uv: 50,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Jun',
        uv: 50,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Jul',
        uv: 55,
        pv: 4300,
        amt: 2100,
    },
    {
        name: 'Aug',
        uv: 50,
        pv: 4300,
        amt: 2100,
    },
    {
        name: 'Sep',
        uv: 58,
        pv: 4300,
        amt: 2100,
    },
];

export default class ReAreaGraph extends PureComponent {

    render() {
        return (
            <ResponsiveContainer width="99%" height={250}>
                <AreaChart data={data} margin={{top: 30}}>
                    <defs>
                        <linearGradient id="colorUv" x1="1" y1="0" x2="1" y2="1">
                            <stop offset="23%" stopColor="#FFCC99" stopOpacity={0.9}/>
                            <stop offset="100%" stopColor="#FFCC99" stopOpacity={0.3}/>
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="name" style={{stroke: "transparent"}}/>
                    <YAxis style={{stroke: "transparent"}}/>
                    <CartesianGrid stroke={"transparent"}/>

                    <Tooltip cursor={false} separator=""/>
                    <Area dataKey="uv" stroke="#FFCC99" fillOpacity={1} fill="url(#colorUv)"/>
                </AreaChart>
            </ResponsiveContainer>
        );
    }
}
