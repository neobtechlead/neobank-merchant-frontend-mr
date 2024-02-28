import React from 'react';
import SettingsChangePasswordForm from "@/components/settings/SettingsChangePasswordForm";

const SettingsContent: React.FC<ISettingsContentProps> = () => {
    return (
        <>
            <div className="w-full h-full flex justify-center">
                <div className="mt-10">
                    <div className="gap-x-8">
                        <SettingsChangePasswordForm/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SettingsContent;
