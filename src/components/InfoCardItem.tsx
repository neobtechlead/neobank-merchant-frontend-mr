import React from 'react';
import Svg from "@/components/Svg";

const InfoCardItem: React.FC<IDetailItemProps> = ({svgFill = '#4F4F4F', svgPath, title, description, customStyles, customTitleStyles, customDescriptionStyles}) => {
    return (
        <div className={`flex gap-3 items-center ${customStyles}`}>
            {svgPath && <div className="flex items-center">
                <Svg fill={svgFill ?? ''} path={svgPath ?? ''}/>
            </div>}
            <div className="truncate">
                <p className={`truncate text-xs font-semibold text-gray-600 ${customTitleStyles}`}>{title}</p>
                <p className={`truncate text-gray-950 ${customDescriptionStyles}`}>{description}</p>
            </div>
        </div>
    );
};

export default InfoCardItem;
