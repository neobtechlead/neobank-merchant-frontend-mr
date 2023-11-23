export interface IDisbursementActionContent {
    contentType: string;
    openConfirmationDialog?: (b: boolean) => void;
}