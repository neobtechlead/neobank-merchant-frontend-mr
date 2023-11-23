import {create} from 'zustand'
import {DisbursementStoreType} from "@/utils/types/DisbursementStoreType";

export const useDisbursementStore = create<DisbursementStoreType>((set) => ({
    actionType: 'single',
    setActionType: (action) => set((state) => ({...state, action})),
}))

