import React from "react";

export interface IUtils {
    setLoading?: (loading: boolean) => void;
    loading?: boolean;
    setVerificationHeaderClasses?: (loading: string) => void;
    verificationHeaderClasses?: string;
}