export interface IDisbursementActionContent {
    actionType: string;
    contentType: string;
    openConfirmationDialog?: (b: boolean) => void;
    resetDashboard?: () => void;
}