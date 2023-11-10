import React from 'react';
import {CheckCircle} from '../../public/assets/icons/checkCircle';
import {Clock} from '../../public/assets/icons/Clock';
import {XCircle} from '../../public/assets/icons/XCircle';
import Svg from "@/components/Svg";
import {IAlert} from "@/utils/interfaces/IAlert";

const Alert: React.FC<IAlert> = ({
                                         alertType,
                                         description,
                                         customClasses,
                                         children,
                                         descriptionClasses
                                     }) => {
    const alertIcons = {
        success: CheckCircle,
        successful: CheckCircle,
        info: CheckCircle,
        warning: Clock,
        'in progress': Clock,
        error: XCircle,
        failed: XCircle,
        completed: CheckCircle
    };

    const alertIconColors = {
        success: '#008000',
        successful: '#008000',
        info: '#06b6d4',
        warning: '#F29339',
        'in progress': '#F29339',
        error: '#EB2F2F',
        failed: '#EB2F2F',
        completed: '#000000'
    };

    const alertBackgroundColors = {
        success: '#0080001A',
        successful: '#0080001A',
        info: '#ECFEFF',
        warning: '#F293391A',
        error: '#EB2F2F1A',
        failed: '#EB2F2F1A',
        completed: '#0000001A'

    };

    return (
        <div className={`rounded p-1 ${customClasses}`} style={{background: alertBackgroundColors[alertType]}}>
            <div className="flex items-center justify-between">
                <div className="flex-shrink-0 mx-1">
                    {alertType && <Svg fill={alertIconColors[alertType]} path={alertIcons[alertType]}/>}
                </div>
                {description && <p className={`flex items-center gap-1 ${descriptionClasses}`}
                                   style={{color: alertIconColors[alertType]}}>{description}</p>}
                <div className="flex-1 md:flex md:justify-between">{children}</div>
            </div>
        </div>
    );
};

export default Alert;
