import {create} from 'zustand'
import {DisbursementStoreType} from "@/utils/types/DisbursementStoreType";
import {devtools, persist} from 'zustand/middleware';

const useDisbursementStore = create<DisbursementStoreType>()(
    devtools(
        persist(
            (set) => ({
                actionType: 'single',
                setActionType: (action: string) => set({actionType: action}),
            }),
            {name: 'disbursement'},
        ),
    ),
)

export {useDisbursementStore};
