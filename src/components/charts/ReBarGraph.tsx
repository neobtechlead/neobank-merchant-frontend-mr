import React, {PureComponent} from 'react';
import {BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';

export default class ReBarGraph extends PureComponent {
    render() {
        const { data } = this.props;

        return (
            <ResponsiveContainer width="99%">
                <BarChart
                    data={data}
                    margin={{
                        top: 73,
                    }}
                >
                    <CartesianGrid strikethroughPosition={1} strokeWidth={1} vertical={false}/>
                    <XAxis dataKey="name" style={{stroke: "transparent"}} fill={"#FFCC99"}/>
                    <YAxis style={{stroke: "transparent"}}/>
                    <Tooltip cursor={{fill: 'transparent'}}/>
                    <Bar dataKey="pv" fill="#FFCC99"/>
                    <Bar shape={<rect
                        fill={"fill"}
                        radius={"0, 0, 20, 20"}
                    />} dataKey="uv" fill="#59D3D4"/>} />
                </BarChart>
            </ResponsiveContainer>
        );
    }
}