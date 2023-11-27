import React from 'react';

interface StatusBadgeProps {
    color: string;
    background: string;
    status: string | undefined;
    customStyles?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({color, background, status, customStyles}) => {
    const badgeStyle = {
        color,
        background,
    };

    const statusColors = {
        success: '#008000',
        info: '#06b6d4',
        pending: '#F29339',
        error: '#EB2F2F',
        failed: '#EB2F2F',
        completed: '#000000'
    };

    const statusBackgroundColors = {
        success: '#0080001A',
        info: '#ECFEFF',
        warning: '#F293391A',
        error: '#EB2F2F1A',
        completed: '#0000001A'

    };


    const formattedStatuses = {
        successful: 'success',
        success: 'success',
        failed: 'failed',
        'in progress': 'pending',
        'pending': 'pending',
        completed: 'completed'
    };

    return (
        <div className="">
            <dt className="sr-only">Status</dt>
            <dd className={`inline-flex items-center rounded-md text-xs capitalize ${customStyles}`}
                style={{color: statusColors[formattedStatuses[status]]}}>
                {status}
            </dd>
        </div>
    );
};

export default StatusBadge;
