import {create} from 'zustand'
import {DisbursementStoreType} from "@/utils/types/DisbursementStoreType";
import {devtools, persist} from 'zustand/middleware';

const useDisbursementStore = create<DisbursementStoreType>()(
    devtools(
        persist(
            (set) => ({
                actionType: 'single',
                setActionType: (action: any) => set((state) => ({...state, action})),
            }),
            {name: 'dashboard'},
        ),
    ),
)

export {useDisbursementStore};
