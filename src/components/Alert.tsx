import React from 'react';
import {CheckCircle} from '@/assets/icons/CheckCircle';
import {Clock} from '@/assets/icons/Clock';
import {XCircle} from '@/assets/icons/XCircle';
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
        queued: Clock,
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
        queued: '#F29339',
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
        queued: '#F293391A',
        'in progress': '#F293391A',
        error: '#EB2F2F1A',
        failed: '#EB2F2F1A',
        completed: '#0000001A'
    };

    const getText = (text: string) => {
        return text.toLowerCase()
    };


    return (
        <div className={`rounded p-1 ${customClasses}`} style={{background: alertBackgroundColors[getText(alertType)]}}>
            <div className="flex items-center justify-between">
                <div className="flex-shrink-0 mx-1">
                    {alertType &&
                        <Svg fill={alertIconColors[getText(alertType)]} path={alertIcons[getText(alertType)]}/>}
                </div>
                {description && <p className={`flex items-center gap-1 ${descriptionClasses}`}
                                   style={{color: alertIconColors[getText(alertType)]}}>{description}</p>}
                <div className="flex-1 md:flex md:justify-between">{children}</div>
            </div>
        </div>
    );
};

export default Alert;
