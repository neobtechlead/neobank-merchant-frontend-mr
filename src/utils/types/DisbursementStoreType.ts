export type DisbursementStoreType = {
    actionType: string,
    setActionType: (action: () => { actionType: any }) => void,
}