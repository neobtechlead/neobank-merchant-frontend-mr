import {create} from 'zustand'
import {IUtils} from "@/utils/interfaces/IUtils";

export const useUtilsStore = create<IUtils>((set) => ({
    setLoading: (loading: boolean) => set({loading}),
    loading: false
}))

