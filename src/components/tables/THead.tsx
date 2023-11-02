import React, {ReactNode} from 'react';

type TableHeadProps = {
    heading: string[];
    children: ReactNode;
};

const TableHead: React.FC<TableHeadProps> = ({heading, children}) => {
    return (
        <thead className="bg-white">
        <tr>
            {heading.map((item, index) => (
                <th key={index} scope="col"
                    className="relative isolate py-3.5 pr-3 text-left text-sm font-semibold text-gray-900 capitalize">
                    {item}
                    <div className="absolute inset-y-0 right-full -z-10 w-screen border-b border-b-gray-200"/>
                    <div className="absolute inset-y-0 left-0 -z-10 w-screen border-b border-b-gray-200"/>
                </th>
            ))}
        </tr>
        </thead>
    );
};

export default TableHead;
