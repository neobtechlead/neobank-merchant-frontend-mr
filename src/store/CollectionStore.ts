import {create} from 'zustand'
import {devtools, persist} from "zustand/middleware";
import {CollectionStoreType} from "@/utils/types/CollectionStoreType";

export const useCollectionStore = create<CollectionStoreType>()(
    devtools(
        persist(
            (set) => ({
                actionType: 'single',
                setActionType: (action: string) => set({actionType: action}),
            }),
            {name: 'collection'},
        ),
    ),
)