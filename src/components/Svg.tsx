import React from 'react';
import {ISvgProps} from "@/utils/interfaces/ISvgProps";

const Svg: React.FC<ISvgProps> = ({width = 24, height = 24, fill, style, path, customClasses, custom, children}) => {
    return (
        <div className={`flex items-center ${customClasses}`} aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height}
                 viewBox={`0 0 ${width} ${height}`}
                 style={{fill, ...style}}>
                <path d={path}/>
            </svg>
            {custom && <div>{children}</div>}
        </div>

    );
};

export default Svg;
