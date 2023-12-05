import {create} from 'zustand'
import {devtools, persist} from 'zustand/middleware';
import {SupportStoreType} from "@/utils/types/SupportStoreType";

const useSupportStore = create<SupportStoreType>()(
    devtools(
        persist(
            (set) => ({
                showButton: true,
                setShowButton: (action) => set((state) => ({...state, action})),
            }),
            {name: 'support'},
        ),
    ),
)

export {useSupportStore};
