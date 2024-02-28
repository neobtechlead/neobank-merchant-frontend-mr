import React from 'react';

interface StatusBadgeProps {
    status: string;
    background?: boolean;
    customStyles?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({status, background, customStyles}) => {
    const statusColors: { [key: string]: string; } = {
        success: '#008000',
        info: '#06b6d4',
        initiated: '#06b6d4',
        pending: '#F29339',
        error: '#EB2F2F',
        failed: '#EB2F2F',
        completed: '#000000'
    };

    const statusBackgroundColors: { [key: string]: string; } = {
        success: '#0080001A',
        info: '#ECFEFF',
        warning: '#F293391A',
        initiated: '#ECFEFF',
        error: '#EB2F2F1A',
        completed: '#0000001A'
    };

    const formattedStatuses: { [key: string]: string; } = {
        successful: 'success',
        success: 'success',
        failed: 'failed',
        'in progress': 'pending',
        pending: 'pending',
        completed: 'completed',
        initiated: 'info',
        queued: 'info',
    };

    return (
        <div className="">
            <dt className="sr-only">Status</dt>
            <dd className={`inline-flex items-center rounded-md text-xs capitalize ${customStyles}`}
                style={{
                    color: statusColors[formattedStatuses[status]],
                    background: background ? statusBackgroundColors[formattedStatuses[status]] : ''
                }}>
                {status}
            </dd>
        </div>
    );
};

export default StatusBadge;
