import {create} from 'zustand'
import {ISupport} from "@/utils/interfaces/ISupport";

export const useDisbursementStore = create<ISupport>((set) => ({
    showButton: true,
    setShowButton: (action) => set((state) => ({...state, action})),
}))

